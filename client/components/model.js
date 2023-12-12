import * as tf from '@tensorflow/tfjs';

export function createModel(inputShape) {
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 50, activation: 'relu', inputShape: [inputShape]}));
    model.add(tf.layers.dense({units: 1}));

    model.compile({loss: 'meanSquaredError', optimizer: 'adam'});
    return model;
}

export async function trainModel(model, xTrain, yTrain) {
    const tensorX = tf.tensor2d(xTrain);
    const tensorY = tf.tensor2d(yTrain, [yTrain.length, 1]);

    await model.fit(tensorX, tensorY, {epochs: 100});
    return model;
}
