

import * as tf from '@tensorflow/tfjs';

// Step 1: Data Preprocessing
function convertDurationToSeconds(duration) {
  const [minutes, seconds] = duration.split(':');
  return parseInt(minutes) * 60 + parseInt(seconds);
}

// Dummy workout data for rowing (replace with actual data)
const workoutData = [
  { duration: '02:06', date: '2023-12-08' },
  { duration: '01:54', date: '2023-12-09' },
  { duration: '02:19', date: '2023-12-04' },
  { duration: '02:01', date: '2023-12-22' },
  { duration: '01:58', date: '2023-12-12' },
  { duration: '01:59', date: '2023-12-23' },
  { duration: '01:53', date: '2023-12-25' },
  { duration: '01:49', date: '2023-12-27' },
];


async function prepareData() {
  const processedData = workoutData.map(workout => ({
    duration: convertDurationToSeconds(workout.duration),
    // Add other relevant features here...
  }));

  const sequenceLength = 5;
  const sequences = [];
  const targetValues = []; // Array to hold target values


  for (let i = 0; i <= processedData.length - sequenceLength; i++) {
    const sequence = processedData.slice(i, i + sequenceLength);
    sequences.push(sequence);

    // Assuming the target is the duration of the next workout
    if (i + sequenceLength < processedData.length) {
      targetValues.push(processedData[i + sequenceLength].duration);
    }
  }

  if (!sequences || sequences.length === 0) {
    console.error("No sequences available for data processing");
    return { inputFeatures: null, targetTensor: null, sequences: null };
  }


  const inputFeatures = sequences.map(sequence =>
    sequence.map(data => [data.duration]) // Ensure each data point is an array
  );
  const targetTensor = tf.tensor2d(targetValues, [targetValues.length, 1]); // Convert targetValues to a 2D tensor

  return { inputFeatures, targetTensor, sequences };
}



export async function trainModel() {
  const { inputFeatures, targetTensor } = await prepareData();

  if (!inputFeatures || inputFeatures.length === 0 || !targetTensor) {
    console.error("Input features or target tensor is undefined or empty");
    return null;
  }

  const sequenceLength = inputFeatures[0].length;
  const numFeatures = inputFeatures[0][0].length;
  const model = tf.sequential();
  model.add(tf.layers.lstm({ units: 50, inputShape: [sequenceLength, numFeatures] }));
  model.add(tf.layers.dense({ units: 1 }));

  model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

  // Reshape inputFeatures to match the model's expected input shape
  // const inputTensor = tf.tensor3d(inputFeatures, [inputFeatures.length, sequenceLength, 1]);
  const inputTensor = tf.tensor3d(inputFeatures);

  await model.fit(inputTensor, targetTensor, { epochs: 100 });

  return model;
}

export async function predictNextWorkoutTime(model) {
  const { sequences } = await prepareData();

  if (!sequences || sequences.length === 0) {
    console.error("No sequences available for prediction");
    return null;
  }

  const lastSequence = sequences[sequences.length - 1];
  const inputForPrediction = lastSequence.map(data => data.duration);

  // Reshape input for prediction to match the model's expected input shape
  const predictionTensor = model.predict(tf.tensor3d([inputForPrediction], [1, inputForPrediction.length, 1]));
  const prediction = await predictionTensor.data();

  return prediction[0];
}

