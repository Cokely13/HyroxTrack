import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../store/allEventsStore';
import { fetchSingleUser } from '../store/singleUserStore'
import { fetchTargets } from '../store/allTargetsStore';
import {createTarget} from '../store/allTargetsStore'
import {updateSingleTarget} from '../store/singleTargetStore'

function UserTarget() {
  const dispatch = useDispatch();
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )
  const events = useSelector((state) => state.allEvents);
  const targets = useSelector((state) => state.allTargets);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [refreshTargets, setRefreshTargets] = useState(false);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTargets());
    setRefreshTargets(false)
  }, [dispatch, refreshTargets]);

  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [dispatch,])

  const userTargets = targets.filter(target => target.userId === id);

  const getTargetTimeForEvent = (eventId) => {
    const userTarget = userTargets.find(target => target.eventId === eventId);
    return userTarget ? userTarget.duration : 'No Target selected yet';
  };


  const handleEdit = (chosen) => {
    setSelectedEventId(chosen.id);
    setSelectedEvent(chosen);
    const targetTime = targets.find((target) => target.eventId == chosen.id && id == target.userId)?.duration || '00:00';
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
    const existingTarget = userTargets.find(target => target.eventId === selectedEventId && target.userId === id);

    const targetData = {
      userId: id,
      eventId: selectedEventId,
      duration: targetTime
    };


    if (existingTarget) {
      // Update existing target
      dispatch(updateSingleTarget({...existingTarget, ...targetData}));
    } else {
      // Create new target
      dispatch(createTarget(targetData));
    }
    setSelectedEventId(null);
    setMinutes('00');
    setSeconds('00');
    setRefreshTargets(true)
  };

  return (
    <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
      <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}><b>Target Times</b></h1>
      <table className="table table-bordered text-center profile rounded text-center add" style= {{backgroundColor:"rgb(211, 211, 211)"}}>
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
                  getTargetTimeForEvent(event.id)
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
                    Edit Time
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

export default UserTarget;
