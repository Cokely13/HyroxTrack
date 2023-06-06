import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import TimePicker from 'react-time-picker';
import { createResult } from '../store/allResultsStore';
import { fetchSingleUser } from '../store/singleUserStore';
import { fetchEvents } from '../store/allEventsStore';

const AddResult = () => {
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


  console.log("user", user)
  console.log("events", events)

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

    if (!eventName) {
      setErrorMessage('Please Select Event');
      return;
    }

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

    // Set the success message and clear the input fields
    setSuccessMessage('Result Added Successfully!');
    setEventName('');
    setDate('');
    setMinutes('');
    setSeconds('');
    setErrorMessage('');
  };

  return (
    <div className="border rounded border-5" style={{ backgroundColor: 'white', margin: '15px 50px 50px', textAlign: 'center', padding: '20px', border: '1px solid black', borderRadius: "10px",  }}>

      <h1 className="profile border rounded border-5   text-white-50  text-center " style={{ marginBottom: "15px", marginTop: "15px", marginLeft: "40%", marginRight: "40%"  }}>Add Result</h1>
    <form onSubmit={handleSubmit}>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
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
      <div>
        <label htmlFor="date" style={{ marginRight: "10px" }}>Date:  </label>
        <input type="date" id="date" value={date} onChange={handleDateChange} />
      </div>
      <div>
        <label htmlFor="minutes" style={{ marginRight: "10px" }}>Duration:  </label>
        <input
          type="number"
          id="minutes"
          min="0"
          max="60"
          value={minutes}
          onChange={handleMinutesChange}
          style={{ marginRight: '5px' }}
        />
        :
        <input
          type="number"
          id="seconds"
          min="0"
          max="59"
          value={seconds}
          onChange={handleSecondsChange}
          style={{ marginLeft: '5px' }}
        />
      </div>
      <button type="submit">Add Result</button>
    </form>
    </div>
  );
};

export default AddResult;
