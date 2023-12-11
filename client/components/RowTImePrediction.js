import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { trainModel, predictNextWorkoutTime } from '../tensorFlow/rowTimePrediction'; // Import TensorFlow functions

function RowTimePrediction() {
  const [prediction, setPrediction] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    // Load and set the model when the component mounts
    async function loadModel() {
      try {
        const loadedModel = await trainModel(); // Adjust this function to load your model
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading the model:', error);
      }
    }
    loadModel();
  }, []);


  const handlePredictClick = async () => {
    if (model) {
      try {
        const lastInputSequence = getLastInputSequence(); // This function should return the last sequence of inputs
        const nextTimeInSeconds = await predictNextWorkoutTime(model, lastInputSequence);
        setPrediction(nextTimeInSeconds);
      } catch (error) {
        console.error('Error making a prediction:', error);
      }
    } else {
      alert('Model not loaded yet. Please wait a moment and try again.');
    }
  };

  return (
    <div>
      <h2>Row Time Prediction</h2>
      <button onClick={handlePredictClick}>Predict Next Row Time</button>
      {prediction !== null && (
        <div>
          <p>Predicted Next Row Time: {prediction} seconds</p>
        </div>
      )}
    </div>
  );
}

// Dummy function to simulate getting the last input sequence
// Replace this with your actual logic for fetching the last sequence
function getLastInputSequence() {
  // This should return the last sequence of data in the format expected by your model
  return [/* array of last sequence data */];
}

export default RowTimePrediction;
