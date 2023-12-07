// timePredictionModel.js
import * as tf from '@tensorflow/tfjs';

// Define a function to create and compile the model
export async function createModel() {
  const model = tf.sequential();

  // Add a single dense layer
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

  // Compile the model
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

  return model;
}
