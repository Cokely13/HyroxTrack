// import React, { useState, useEffect } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import { createModel, trainModel } from './model';

// function Predictor() {
//     const [model, setModel] = useState(null);


//     useEffect(() => {
//         const loadModel = async () => {
//             const model = createModel();
//             await trainModel(model, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
//             setModel(model);
//         };
//         loadModel();
//     }, []);

//     const predictNext = async () => {
//         if(model) {
//             const prediction = model.predict(tf.tensor2d([7], [1, 1]));
//             const nextValue = prediction.dataSync()[0];
//             console.log(nextValue); // Output the prediction
//         }
//     };

//     return (
//         <div>
//             <button onClick={predictNext}>Predict Next Time</button>
//         </div>
//     );
// }

// export default Predictor;

import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { createModel, trainModel } from './model';

function Predictor() {
    const [model, setModel] = useState(null);

    useEffect(() => {
        const loadModel = async () => {
            const model = createModel();

            // Example date inputs and corresponding values
            const dates = ["2023-11-09", "2023-11-12", "2023-11-13"];
            const values = [121, 122, 118];

            // Preprocess dates
            const numericDates = dates.map(date => new Date(date).getTime());

            // Train the model
            await trainModel(model, numericDates, values);
            setModel(model);
        };
        loadModel();
    }, []);

    const predictNext = async () => {
        if(model) {
            // Example prediction date
            const predictionDate = new Date("2023-11-14").getTime();
            const prediction = model.predict(tf.tensor2d([predictionDate], [1, 1]));
            const nextValue = prediction.dataSync()[0];
            console.log(nextValue); // Output the prediction
        }
    };

    return (
        <div>
            <button onClick={predictNext}>Predict Next Time</button>
        </div>
    );
}

export default Predictor;


