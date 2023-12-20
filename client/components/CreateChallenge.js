

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { createChallenge} from '../store/allChallengesStore'
import { fetchSingleUser } from '../store/singleUserStore'
import {fetchUsers} from '../store/allUsersStore'
import { fetchEvents } from '../store/allEventsStore'


export default function CreateChallenge() {
  const currentDate = new Date().getTime()
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )
  const [eventId, setEventId] = useState();
  const [reload, setReload] = useState(1);
  const [invite, setInvite] = useState([id]);
  const [showDateSelection, setShowDateSelection] = useState(false);
  const [start, setStart] = useState((currentDate));
  const events = useSelector((state) => state.allEvents )
  const users = useSelector((state) => state.allUsers )
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([id.toString()]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [reload, dispatch,])





  const handleEventChange = (event) => {
    event.preventDefault()
    setEventId(event.target.value)
    setErrorMessage('')

  }

  const handleCheckboxChange = (event) => {
    const changedUserId = event.target.value;
    const isChecked = event.target.checked;

    setSelectedUsers(prevSelectedUsers => {
      if (isChecked) {
        // Add the user ID to the array if it's checked
        return [...prevSelectedUsers, changedUserId];
      } else {
        // Remove the user ID from the array if it's unchecked
        return prevSelectedUsers.filter(userId => userId !== changedUserId);
      }
    });
  };


  const handleChange2 = (event) => {
    event.preventDefault()
    setLocation(event.target.value)

  }

  const handleChange3 = (event) => {
    event.preventDefault()
    setLength(event.target.value)
  }

  const handleChange4 = (event) => {
    event.preventDefault()
    const selectedDate = new Date(event.target.value).getTime();
    setStart(event.target.value)
  }

  const handleChange5 = (event) => {
    event.preventDefault()
    const selectedDate = new Date(event.target.value).getTime();
    setEnd(event.target.value)
  }

  const handleChange7 = (event) => {
    event.preventDefault()
    const selectedDate = new Date(event.target.value).getTime();
  }

  const handleClick = (e) => {
    e.preventDefault()

    if (!eventId) {
      setErrorMessage("Please select an event.");
      return; // Prevent further execution
    }

    const startDateObject = new Date(start);
    startDateObject.setDate(startDateObject.getDate() + 7);
    const endDate = startDateObject.toISOString().split('T')[0];

    const newChallenge= {
     eventId: eventId,
     userId: id,
     startDate: start,
     endDate: endDate,
     invites: selectedUsers
    }

    console.log("new", newChallenge)

    dispatch(createChallenge(newChallenge))
    setEventId("")
    setStart(currentDate)
    setSelectedUsers([id.toString()]); // Reset selected users, keeping only the user's own ID
    setErrorMessage(''); // Optionally clear the error message
  }

  const handleToggleDateSelection = () => {
    setShowDateSelection(!showDateSelection);
  };

  return (
    <div >
    <form>
      <div >
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
              <label>
                <h2 htmlFor="start" style={{marginRight: "10px"}}>Start Date: </h2>
              </label>

              (
             <>
               <input
                 type="date"
                 id="dateInput"
                 value={new Date(start).toISOString().split('T')[0]}
                 onChange={handleChange4}
               />
               <button className="btn btn-primary" style={{marginLeft: "10px"}} onClick={handleToggleDateSelection}>
                 Cancel
               </button>
             </>
           )
            </div>
      </div>
      {errorMessage && (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            {errorMessage}
          </div>
        )}
    </form>
    <div className="text-center">
    <button className="btn btn-primary text-center"  onClick={handleClick}>Add Challenge</button>
    </div>
  </div>
  )
}

