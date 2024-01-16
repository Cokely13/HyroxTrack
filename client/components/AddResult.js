import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
// import TimePicker from 'react-time-picker';
import { createResult } from '../store/allResultsStore';
import { fetchSingleUser } from '../store/singleUserStore';
import { fetchResults } from '../store/allResultsStore';
import { fetchEvents } from '../store/allEventsStore';
import { updateSingleAverage } from '../store/singleAverageStore';
import { createAverage } from '../store/allAveragesStore';
import { fetchAverages } from '../store/allAveragesStore';

const AddResult = ({ selectedChallenge }) => {
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let history = useHistory();
  const results = useSelector((state) => state.allResults);
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const user = useSelector((state) => state.singleUser )
  const events = useSelector((state) => state.allEvents )
  const averages = useSelector((state) => state.allAverages);

  const {eventId} = selectedChallenge
  const { id: challengeId } = selectedChallenge

  const durationToSeconds = (duration) => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

  const filteredResults = [...results.filter((event) => event.eventName == eventName)]
  const sortedResults = [...filteredResults].sort((a, b) => new Date(a.date) - new Date(b.date));
  const durationsInSeconds = sortedResults.map(result => durationToSeconds(result.duration));


  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])

  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }

  useEffect(() => {
    dispatch(fetchEvents())
    // Safe to add dispatch to the dependencies array
  }, [])

  const handleEventChange = (e) => {
    setEventName(e.target.value);
  };

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
      challengeId: challengeId,
      eventName: events.find(event => event.id === eventId)?.name,
      eventId: eventId,
      date,
      duration: `${minutes}:${seconds}`,
    };

    const existingAverage = averages.find(avg => avg.eventId === newResult.eventId && avg.userId === id);

    const calculateOldAverage = (newDurationSeconds) => {
        const totalDurationInSeconds = filteredResults.reduce((total, currentResult) => {
            return total + durationToSeconds(currentResult.duration);
        }, 0) + newDurationSeconds; // Include new duration in total

        const averageDurationInSeconds =Math.round( totalDurationInSeconds / (filteredResults.length + 1)); // +1 for the new duration
        return formatTime(averageDurationInSeconds); // Convert average to minutes:seconds format
    };

    // // Assuming you have new duration in `minutes` and `seconds`
    const newDurationSeconds = durationToSeconds(`${minutes}:${seconds}`);
    const oldAverage = calculateOldAverage(newDurationSeconds);
    const average = {
        userId: id,
    eventId: eventId,
        duration: oldAverage
      };
    if (!existingAverage) {
        // Calculate the new average
        // ... existing code for calculating oldAverage ...
        dispatch(createAverage(average)); // Create a new average only if it doesn't exist
    } else {
        const updateAverage = {
            id: existingAverage.id,
            userId: id,
        eventId: eventId,
            duration: oldAverage
          };
        dispatch(updateSingleAverage(updateAverage))
    }

    dispatch(createResult(newResult));


    history.push('/myresults');
    console.log("it made it!")
    // Set the success message and clear the input fields
    setSuccessMessage('Result Added Successfully!');
    setEventName('');
    setDate('');
    setMinutes('');
    setSeconds('');
    setErrorMessage('');
    // onResultAdded();
  };

  return (
    <div>
    <div className="addresult">

      <h1 className="profile rounded text-center add"><b>Add Result</b></h1>
    <form onSubmit={handleSubmit}>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
      <div>
        <label htmlFor="event" style={{ marginRight: "10px" }}>Event:</label>
      <div>{events.find(event => event.id === eventId)?.name}</div>
      </div>
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
};

export default AddResult;
