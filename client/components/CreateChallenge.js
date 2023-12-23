import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createChallenge } from '../store/allChallengesStore';
import { fetchSingleUser } from '../store/singleUserStore';
import { fetchUsers } from '../store/allUsersStore';
import { fetchEvents } from '../store/allEventsStore';

export default function CreateChallenge() {
  const currentDateTime = new Date().toISOString().slice(0, 16);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);
  const [eventId, setEventId] = useState();
  const [start, setStart] = useState(currentDateTime);
  const [endDate, setEndDate] = useState(currentDateTime);
  const events = useSelector((state) => state.allEvents);
  const users = useSelector((state) => state.allUsers);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([id.toString()]);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchUsers());
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  const handleEventChange = (event) => {
    setEventId(event.target.value);
    setErrorMessage('');
  };

  const handleCheckboxChange = (event) => {
    const changedUserId = event.target.value;
    const isChecked = event.target.checked;
    setSelectedUsers(prevSelectedUsers => {
      return isChecked
        ? [...prevSelectedUsers, changedUserId]
        : prevSelectedUsers.filter(userId => userId !== changedUserId);
    });
  };

  const handleChange4 = (event) => {
    setStart(event.target.value);
  };

  const handleChange5 = (event) => {
    setEndDate(event.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!eventId) {
      setErrorMessage("Please select an event.");
      return;
    }

    const newChallenge = {
      eventId: eventId,
      userId: id,
      startDate: start,
      endDate: endDate,
      invites: selectedUsers
    };

    dispatch(createChallenge(newChallenge));
    setEventId("");
    setStart(currentDate);
    setEndDate('');
    setSelectedUsers([id.toString()]);
    setErrorMessage('');
  };

  return (
    <div>
      <form>
      <div>
  <label htmlFor="event" style={{ marginRight: "10px" }}>Event:</label>
  <select id="event" value={eventId} onChange={handleEventChange}>
    <option value=""> -- Select Event --</option>
    {events.map((event) => (
      <option key={event.id} value={event.id}>{event.name}</option>
    ))}
  </select>
</div>
        <div>
          <label> <h2 htmlFor="invite" style={{ marginRight: "10px" }}>Invites: </h2></label>
          <div>
          <div>
  <label>
    <h2 style={{ marginRight: "10px" }}>Invites:</h2>
  </label>
  {users.map((user) => (
    <div key={user.id}>
      <input
        type="checkbox"
        id={`checkbox-${user.id}`}
        value={user.id}
        checked={selectedUsers.includes(user.id.toString())} // Ensuring the comparison is correct
        onChange={handleCheckboxChange}
      />
      <label htmlFor={`checkbox-${user.id}`}>{user.userName}</label>
    </div>
  ))}
</div>

</div>
        </div>
        <div>
          <label><h2 htmlFor="start">Start Date:</h2></label>
          <input
            type="datetime-local"
            id="startDateInput"
            value={start}
            onChange={handleChange4}
          />
        </div>
        <div>
          <label><h2 htmlFor="end">End Date and Time:</h2></label>
          <input
            type="datetime-local"
            id="endDateInput"
            value={endDate}
            onChange={handleChange5}
          />
        </div>
        {errorMessage && (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            {errorMessage}
          </div>
        )}
      </form>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleClick}>Add Challenge</button>
      </div>
    </div>
  );
}
