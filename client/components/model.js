// import * as tf from '@tensorflow/tfjs';

// export function createModel() {
//     // Define a model for linear regression.
//     const model = tf.sequential();
//     model.add(tf.layers.dense({units: 1, inputShape: [1]}));

//     // Compile the model with an optimizer and loss function for training.
//     model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

//     return model;
// }

// // export async function trainModel(model, xTrain, yTrain) {
// //     const tensorX = tf.tensor2d(xTrain, [xTrain.length, 1]);
// //     const tensorY = tf.tensor2d(yTrain, [yTrain.length, 1]);

// //     // Train the model
// //     await model.fit(tensorX, tensorY, {epochs: 100});
// //     return model;
// // }

// export async function trainModel(model, xTrain, yTrain) {
//     const tensorX = tf.tensor2d(xTrain, [xTrain.length, 1]);
//     const tensorY = tf.tensor2d(yTrain, [yTrain.length, 1]);

//     // Train the model
//     await model.fit(tensorX, tensorY, {epochs: 100});
//     return model;
// }

import * as tf from '@tensorflow/tfjs';

export function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));

    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
    return model;
}

export async function trainModel(model, xTrain, yTrain) {
    const tensorX = tf.tensor2d(xTrain.map(d => [d]), [xTrain.length, 1]);
    const tensorY = tf.tensor2d(yTrain, [yTrain.length, 1]);

    await model.fit(tensorX, tensorY, {epochs: 100});
    return model;
}
