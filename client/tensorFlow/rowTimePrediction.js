// import * as tf from '@tensorflow/tfjs';

// // Step 1: Data Preprocessing
// function convertDurationToSeconds(duration) {
//   const [minutes, seconds] = duration.split(':');
//   return parseInt(minutes) * 60 + parseInt(seconds);
// }

// async function fetchUserWorkoutData() {
//   try {
//     const response = await fetch('/api/results'); // Replace with your API endpoint
//     if (!response.ok) {
//       throw new Error('Failed to fetch user workout data');
//     }
//     const workoutData = await response.json();
//     return workoutData;
//   } catch (error) {
//     console.error('Error fetching user workout data:', error);
//     return [];
//   }
// }

// // console.log("check", workoutData)

// async function prepareData() {
//   const workoutData = await fetchUserWorkoutData();

//   const processedData = workoutData.map((workout) => ({
//     duration: convertDurationToSeconds(workout.duration),
//     // Add other relevant features here...
//   }));

//   // Rest of the data preprocessing steps
//   // ...

//   const inputFeatures = sequences.map((sequence) => sequence.map((data) => data.duration));
//   // const targetTensor = /* target values for training */;

//   return { inputFeatures, targetTensor, sequences };
// }

// async function trainModel(targetTensor) {
//   const { inputFeatures } = await prepareData();

//   // Step 4: Build and Train a Model (Example)
//   const model = tf.sequential();
//   model.add(tf.layers.lstm({ units: 50, inputShape: [sequenceLength, 1] }));
//   model.add(tf.layers.dense({ units: 1 }));

//   model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

//   const inputTensor = tf.tensor(inputFeatures);

//   await model.fit(inputTensor, targetTensor, { epochs: 100 });

//   return model;
// }

// async function predictNextWorkoutTime(model) {
//   const { sequences } = await prepareData();

//   // Step 5: Predict Next Workout Time
//   const lastSequence = sequences[sequences.length - 1];
//   const inputForPrediction = lastSequence.map((data) => data.duration);
//   const nextTimeInSeconds = await model.predict(tf.tensor([inputForPrediction]))[0].data();

//   console.log(`Predicted next workout time: ${nextTimeInSeconds} seconds`);
// }

// // Call the functions to train and use the model
// (async () => {
//   const { targetTensor } = await prepareData();
//   const model = await trainModel(targetTensor);
//   await predictNextWorkoutTime(model);
// })();

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
];

async function prepareData() {
  const processedData = workoutData.map((workout) => ({
    duration: convertDurationToSeconds(workout.duration),
    // Add other relevant features here...
  }));

  // Rest of the data preprocessing steps
  // ...

  const inputFeatures = sequences.map((sequence) => sequence.map((data) => data.duration));
  // const targetTensor = /* target values for training */;

  return { inputFeatures, targetTensor, sequences };
}

async function trainModel(targetTensor) {
  const { inputFeatures } = await prepareData();

  // Step 4: Build and Train a Model (Example)
  const sequenceLength = 5; // Choose an appropriate sequence length
  const model = tf.sequential();
  model.add(tf.layers.lstm({ units: 50, inputShape: [sequenceLength, 1] }));
  model.add(tf.layers.dense({ units: 1 }));

  model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

  const inputTensor = tf.tensor(inputFeatures);

  await model.fit(inputTensor, targetTensor, { epochs: 100 });

  return model;
}

async function predictNextWorkoutTime(model) {
  const { sequences } = await prepareData();

  // Step 5: Predict Next Workout Time
  const lastSequence = sequences[sequences.length - 1];
  const inputForPrediction = lastSequence.map((data) => data.duration);
  const nextTimeInSeconds = await model.predict(tf.tensor([inputForPrediction]))[0].data();

  console.log(`Predicted next workout time: ${nextTimeInSeconds} seconds`);
}

// Call the functions to train and use the model
(async () => {
  const { targetTensor } = await prepareData();
  const model = await trainModel(targetTensor);
  await predictNextWorkoutTime(model);
})();
