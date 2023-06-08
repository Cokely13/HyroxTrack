import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../store/allEventsStore';
import { updateSingleEvent } from '../store/singleEventStore';

function TargetTimes() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.allEvents);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleEdit = (chosen) => {
    setSelectedEventId(chosen.id);
    setSelectedEvent(chosen);
    const targetTime = events.find((event) => event.id == chosen.id)?.targetTime || '00:00';
    const [ m, s] = targetTime.split(':');
    setMinutes(m);
    setSeconds(s);
  };

  const handleCancel = () => {
    setSelectedEventId(null);
    setMinutes('00');
    setSeconds('00');
  };

  const handleSubmit = () => {
    const targetTime = `${minutes}:${seconds}`;
    selectedEvent.targetTime = targetTime
    dispatch(updateSingleEvent(selectedEvent));
    setSelectedEventId(null);
    setMinutes('00');
    setSeconds('00');
  };

  return (
    <div>
      <h1 className="profile border rounded border-5  text-center " style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}>Target Times</h1>
      <table className="table table-bordered text-center" style= {{backgroundColor:"rgb(211, 211, 211)"}}>
        <thead>
          <tr style= {{fontSize:"30px"}}>
            <th>Event Name</th>
            <th>Target Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style= {{fontSize:"20px"}}>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>
                {selectedEventId == event.id ? (
                  <div>
                    <select value={minutes} onChange={(e) => setMinutes(e.target.value)}>
                      {Array.from(Array(60).keys()).map((num) => (
                        <option key={num} value={num.toString().padStart(2, '0')}>
                          {num.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    :
                    <select value={seconds} onChange={(e) => setSeconds(e.target.value)}>
                      {Array.from(Array(60).keys()).map((num) => (
                        <option key={num} value={num.toString().padStart(2, '0')}>
                          {num.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  event.targetTime.slice(0,5)
                )}
              </td>
              <td>
                {selectedEventId == event.id ? (
                  <div>
                    <button className="btn btn-primary" style={{marginRight: "10px"}} onClick={handleSubmit}>
                      Submit
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-primary" onClick={() => handleEdit(event)}>
                    Edit Event
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TargetTimes;
