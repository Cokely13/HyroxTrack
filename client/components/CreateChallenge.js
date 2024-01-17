import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createChallenge } from '../store/allChallengesStore';
import { fetchSingleUser } from '../store/singleUserStore';
import { fetchUsers } from '../store/allUsersStore';
import { fetchEvents } from '../store/allEventsStore';
import { useHistory } from 'react-router-dom'; // Import useHistory



export default function CreateChallenge() {
  const currentDateTime = new Date().toISOString().slice(0, 16);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);
  const [eventId, setEventId] = useState();
  const [newEvent, setNewEvent] = useState();
  const history = useHistory()


  const [start, setStart] = useState(currentDateTime);
  const [description, setDescription] = useState("");
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
    const selectedEvent = events.find(target => target.id === parseInt(event.target.value, 10))

    if (selectedEvent?.name === 'Random') {
      setNewEvent(true);
      setErrorMessage('');
      setEventId(event.target.value)
    } else {
    setEventId(event.target.value);
    setNewEvent(false)
    setErrorMessage('');}
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

  const handleDescriptionChange = (description) => {
    setDescription(description.target.value)
  }

  const handleChange4 = (event) => {
    setStart(event.target.value);
  };


  const handleChange5 = (event) => {
    const newEndDate = event.target.value;
    const currentDate = new Date().toISOString().slice(0, 16);
    const selectedEndDate = new Date(newEndDate);
    const selectedStartDate = new Date(start);

    if (selectedEndDate < new Date(currentDate)) {
      setErrorMessage('End date cannot be in the past.');
      return;
    } else if (selectedEndDate < selectedStartDate) {
      setErrorMessage('End date cannot be earlier than start date.');
      return;
    }

    setEndDate(newEndDate);
    setErrorMessage('');
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!eventId && !description) {
      setErrorMessage("Please select an event.");
      return;
    }

    const newChallenge = {
      eventId: eventId,
      userId: id,
      startDate: start,
      endDate: endDate,
      invites: selectedUsers,
      description: description
    };

    dispatch(createChallenge(newChallenge));

    history.push('/mychallenges');
    setEventId("");
    setStart(start);
    setEndDate('');
    setSelectedUsers([id.toString()]);
    setErrorMessage('');
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
      <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}><b>Create Challenge</b></h1>
      <form>

        <div>
          <div>
          <div>

  <div className="user-invites-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '80px', width: '35%', marginLeft: 'auto', marginRight: 'auto' }}>
               {users.map((user) => (
            <div className="user-challenge" key={user.id} >
              {/* User image */}
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                margin: 'auto',
                marginTop: "5%",
                backgroundImage: `url(${user.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                border: '3px solid black'
              }} />
              {/* User name */}
              <div  className="user-challenge-name">{user.userName}</div>
              {/* Checkbox */}
              <div style={{ textAlign: 'center' }}>
                <input
                  type="checkbox"
                  id={`checkbox-${user.id}`}
                  value={user.id}
                  checked={selectedUsers.includes(user.id.toString())}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={`checkbox-${user.id}`}></label>
              </div>
            </div>
          ))}
            </div>
</div>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
  <label htmlFor="event">Event:</label>
  <select id="event" value={eventId} onChange={handleEventChange}>
    <option value=""> -- Select Event --</option>
    {events.map((event) => (
      <option key={event.id} value={event.id}>{event.name}</option>
    ))}
  </select>
</div>
{newEvent ?<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
  <label htmlFor="event">Description:</label>
  <input
  type="text"
  id="description"
  value={description}
  onChange={handleDescriptionChange}
  placeholder="Enter Description"
/>
</div> : <div></div>}

</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  {/* Start Date Container */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <label><h2 htmlFor="start">Start Date:</h2></label>
          <input
            type="datetime-local"
            id="startDateInput"
            value={start}
            onChange={handleChange4}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <label><h2 htmlFor="end">End Date:</h2></label>
          <input
            type="datetime-local"
            id="endDateInput"
            value={endDate}
            onChange={handleChange5}
          />
        </div>
        </div>
        {errorMessage && (
          <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center', width: '100%' }}>
            {errorMessage}
          </div>
        )}
      </form>
      <div className="text-center" style={ {marginBottom : '20px'}} >
        <button className="btn btn-primary" onClick={handleClick}>Add Challenge</button>
      </div>
    </div>
  );
}
