import React, { useEffect, useState } from 'react';
import { createModel } from '/Users/RCokely/HyroxTrack/client/timePredictionModel.js'  // Import the createModel function


function TimePrediction() {
  const [model, setModel] = useState(null);
  const [inputValue, setInputValue] = useState(0);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    // Load the TensorFlow.js model when the component mounts
    async function loadModel() {
      const loadedModel = await createModel();
      setModel(loadedModel);
    }

    loadModel();
  }, []);

  // Function to handle input changes
  const handleInputChange = (event) => {
    setInputValue(parseFloat(event.target.value));
  };

  // Function to make predictions
  const makePrediction = async () => {
    if (model) {
      const inputTensor = tf.tensor2d([[inputValue]]);
      const result = await model.predict(inputTensor).data();
      setPrediction(result[0]);
    }
  };

  // Your component logic here...

  return (
    <div>
      <input type="number" value={inputValue} onChange={handleInputChange} />
      <button onClick={makePrediction}>Predict</button>
      {prediction !== null && <p>Prediction: {prediction}</p>}
    </div>
  );
}

export default TimePrediction;
