import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { createModel, trainModel } from './model';
import { useSelector, useDispatch } from 'react-redux';
import { fetchResults } from '../store/allResultsStore';

function Predictor() {
    const dispatch = useDispatch();
    const [model, setModel] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const results = useSelector((state) => state.allResults);

    // Convert duration string to seconds
    const durationToSeconds = (duration) => {
        const [minutes, seconds] = duration.split(':').map(Number);
        return minutes * 60 + seconds;
    };

    useEffect(() => {
        dispatch(fetchResults());
    }, [dispatch]);

    const sortedResults = [...results].sort((a, b) => new Date(a.date) - new Date(b.date));
    const durationsInSeconds = sortedResults.map(result => durationToSeconds(result.duration));

    console.log("sorted", sortedResults)
    console.log("duration", durationsInSeconds)

    const sequenceLength = 3;
    const data = [];
    const labels = [];

    useEffect(() => {
        if (results && results.length > 0) {
            // Assuming each result has a 'date' field


            for (let i = 0; i < durationsInSeconds.length - sequenceLength; i++) {
                data.push(durationsInSeconds.slice(i, i + sequenceLength));
                labels.push(durationsInSeconds[i + sequenceLength]);
            }

            const loadModel = async () => {
                const model = createModel(sequenceLength);
                await trainModel(model, data, labels);
                setModel(model);
            };
            loadModel();
        }
    }, [results]);

    const predictNext = async () => {
        if (model && results && results.length > sequenceLength) {
            const lastData = durationsInSeconds.slice(-sequenceLength);
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
