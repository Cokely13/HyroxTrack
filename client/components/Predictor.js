import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { createModel, trainModel } from './model';
import { useSelector, useDispatch } from 'react-redux';
import { fetchResults } from '../store/allResultsStore';
import { createResult } from '../store/allResultsStore';
import { fetchSingleUser } from '../store/singleUserStore';
import { fetchEvents } from '../store/allEventsStore';

function Predictor() {
    const dispatch = useDispatch();
    const { id } = useSelector((state) => state.auth);
    const [model, setModel] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const results = useSelector((state) => state.allResults);
    const [userTime, setUserTime] = useState('');
    const [eventName, setEventName] = useState('');
    const [date, setDate] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const user = useSelector((state) => state.singleUser )
  const events = useSelector((state) => state.allEvents )

    // Convert duration string to seconds
    const durationToSeconds = (duration) => {
        const [minutes, seconds] = duration.split(':').map(Number);
        return minutes * 60 + seconds;
    };



    useEffect(() => {
        dispatch(fetchEvents())
        // Safe to add dispatch to the dependencies array
      }, [])

      const handleEventChange = (e) => {
        setEventName(e.target.value);
      };

    useEffect(() => {
        dispatch(fetchSingleUser(id))
        // Safe to add dispatch to the dependencies array
      }, [])

    useEffect(() => {
        dispatch(fetchResults());
    }, [dispatch]);


    const filteredResults = [...results.filter((event) => event.eventName == eventName)]
    console.log("filter", filteredResults)
    const sortedResults = [...filteredResults].sort((a, b) => new Date(a.date) - new Date(b.date));
    const durationsInSeconds = sortedResults.map(result => durationToSeconds(result.duration));

    const sequenceLength = 3;
    const data = [];
    const labels = [];
    const canPredict = eventName && filteredResults.length > sequenceLength;

    // useEffect(() => {
    //     if (filteredResults && filteredResults.length > 0) {
    //         // Assuming each result has a 'date' field


    //         for (let i = 0; i < durationsInSeconds.length - sequenceLength; i++) {
    //             data.push(durationsInSeconds.slice(i, i + sequenceLength));
    //             labels.push(durationsInSeconds[i + sequenceLength]);
    //         }

    //         const loadModel = async () => {
    //             const model = createModel(sequenceLength);
    //             await trainModel(model, data, labels);
    //             setModel(model);
    //         };
    //         loadModel();
    //     }
    // }, [filteredResults]);

    useEffect(() => {
        if (eventName) {
            // const filteredResults = results.filter(event => event.eventName === eventName);
            // const sortedResults = filteredResults.sort((a, b) => new Date(a.date) - new Date(b.date));
            // const durationsInSeconds = sortedResults.map(result => durationToSeconds(result.duration));

            if (durationsInSeconds.length > sequenceLength) {
                const data = [];
                const labels = [];

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
        }
    }, [eventName, results]); // Dependency on eventName and results


    const handleDateChange = (e) => {
        setDate(e.target.value);
      };

      const handleMinutesChange = (e) => {
        setMinutes(addLeadingZero(e.target.value));
      };

      const handleSecondsChange = (e) => {
        setSeconds(addLeadingZero(e.target.value));
      };



      const handleSubmit = (e) => {
        e.preventDefault();


        if (!date) {
          setErrorMessage('Please Select Date');
          return;
        }

        if (!minutes && !seconds) {
          setErrorMessage('Please Select Duration');
          return;
        }



        // Create a new result object with the input values
        const newResult = {
          userId: id,
          userName: user.userName,
          eventName,
      eventId: events.filter((event) => event.name == eventName)[0].id,
          date,
          duration: `${minutes}:${seconds}`,
        };

        dispatch(createResult(newResult));
        setSuccessMessage('Result Added Successfully!');
        setEventName('');
        setDate('');
        setMinutes('');
        setSeconds('');
        setErrorMessage('');
      }

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
              <div>
        <label htmlFor="event" style={{ marginRight: "10px" }}>Event:</label>
        <select id="event" value={eventName} onChange={handleEventChange}>
          <option value=""> -- Select Event --</option>
          <option value="Rowing">Rowing</option>
          <option value="SkiErg">SkiErg</option>
          <option value="SledPush">SledPush</option>
          <option value="SledPull">SledPull</option>
          <option value="Burpee Broad Jumps">Burpee Broad Jumps</option>
          <option value="Farmers Carry">Farmers Carry</option>
          <option value="Burpee Broad Jumps">Burpee Broad Jumps</option>
          <option value="Sandbag Lunges">Sandbag Lunges</option>
          <option value="Wall Balls">Wall Balls</option>
        </select>
      </div>
      {canPredict ? (
                <button onClick={predictNext}>Predict Next {eventName} Time</button>
            ) : eventName && (
                <p>Not Enough {eventName} Results to Predict</p>
            )}

            {prediction && (
                <div>
                    <p>Predicted Time: {formatTime(prediction)}</p>
                </div>
            )}


         <div className="profile rounded text-center add" style={{ backgroundColor: 'white', margin: '15px 50px 50px', textAlign: 'center', padding: '20px', fontSize: "25px"  }}>

<h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px", marginLeft: "40%", marginRight: "40%"  }}><b>Add {eventName}  Result</b></h1>
<form onSubmit={handleSubmit}>
{errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
<div>
  <label htmlFor="date" style={{ marginRight: "10px" }}>Date:  </label>
  <input type="date" id="date" value={date} onChange={handleDateChange} />
</div>
<div>
<label htmlFor="minutes" style={{ marginRight: "10px" }}>Duration:  </label>
   <select style={{marginRight: "5px"}} value={minutes} onChange={(e) => setMinutes(e.target.value)}>
                {Array.from(Array(60).keys()).map((num) => (
                  <option key={num} value={num.toString().padStart(2, '0')}>
                    {num.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
              :
              <select style={{marginLeft: "5px"}} value={seconds} onChange={(e) => setSeconds(e.target.value)}>
                {Array.from(Array(60).keys()).map((num) => (
                  <option key={num} value={num.toString().padStart(2, '0')}>
                    {num.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
</div>
<button className="btn btn-primary"  type="submit">Add Result</button>
</form>
</div>
        </div>
    );
}

export default Predictor;
