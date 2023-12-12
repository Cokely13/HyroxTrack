import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { createModel, trainModel } from './model';
import { useSelector, useDispatch } from 'react-redux';
import {fetchResults} from '../store/allResultsStore'

function Predictor() {
    const dispatch = useDispatch();
    const [model, setModel] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const results = useSelector((state) => state.allResults);

    useEffect(() => {
        dispatch(fetchResults());
      }, [dispatch]);

      console.log("results", results)

    useEffect(() => {
        const loadModel = async () => {
            const rawData = [121, 122, 120, 121, 118, 120, 119, 120, 118, 121, 119, 118, 116, 117, 117, 114, 118, 116, 115, 116, 114];
            const sequenceLength = 3;
            const data = [];
            const labels = [];

            for (let i = 0; i < rawData.length - sequenceLength; i++) {
                data.push(rawData.slice(i, i + sequenceLength));
                labels.push(rawData[i + sequenceLength]);
            }

            const model = createModel(sequenceLength);
            await trainModel(model, data, labels);
            setModel(model);
        };
        loadModel();
    }, []);

    const predictNext = async () => {
        if(model) {
            const lastData = [119, 118, 116]; // Last 3 numbers from your data
            const predictionResult = model.predict(tf.tensor2d([lastData], [1, 3]));
            const nextValue = predictionResult.dataSync()[0];
            setPrediction(nextValue); // Update the prediction state
        }
    };

    // Function to convert seconds to minutes and seconds
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes} minute(s) and ${remainingSeconds} second(s)`;
    };

    return (
        <div>
            <button onClick={predictNext}>Predict Next Time</button>
            {prediction && (
                <div>
                    <p>Predicted Time: {formatTime(prediction)}</p>
                </div>
            )}
        </div>
    );
}

export default Predictor;
