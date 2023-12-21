import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import TimePicker from 'react-time-picker';
import { createResult } from '../store/allResultsStore';
import { fetchSingleUser } from '../store/singleUserStore';
import { fetchEvents } from '../store/allEventsStore';

const AddResult = ({ selectedChallenge, onResultAdded  }) => {
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const user = useSelector((state) => state.singleUser )
  const events = useSelector((state) => state.allEvents )

  const {eventId} = selectedChallenge
  const { id: challengeId } = selectedChallenge



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

    dispatch(createResult(newResult));

    // Set the success message and clear the input fields
    setSuccessMessage('Result Added Successfully!');
    setEventName('');
    setDate('');
    setMinutes('');
    setSeconds('');
    setErrorMessage('');
    onResultAdded();
  };

  return (
    <div className="profile rounded text-center add" style={{ backgroundColor: 'white', margin: '15px 50px 50px', textAlign: 'center', padding: '20px', fontSize: "25px"  }}>

      <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px", marginLeft: "40%", marginRight: "40%"  }}><b>Add Result</b></h1>
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
  );
};

export default AddResult;
