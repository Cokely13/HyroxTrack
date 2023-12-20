

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
  const [createdBy, setCreatedBy] = useState();
  const [location, setLocation] = useState();
  const [length, setLength] = useState();
  const [invite, setInvite] = useState([]);
  const [dates, setDates] = useState();
  const [response, setResponse] = useState(currentDate);
  const [showDateSelection, setShowDateSelection] = useState(false);
  const [start, setStart] = useState((currentDate));
  const [end, setEnd] = useState(currentDate);
  const events = useSelector((state) => state.allEvents )
  const users = useSelector((state) => state.allUsers )

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


  const toggleInvite = (event, userId) => {
    event.preventDefault();  // prevent the default button click behavior
    if (invite.includes(userId)) {
      setInvite(invite.filter(id => id !== userId));
    } else {
      setInvite([...invite, userId]);
    }
}

  const isSelected = (userId) => {
    return invite.includes(userId);
  }


  const handleEventChange = (event) => {
    event.preventDefault()
    setEventId(event.target.value)
    setCreatedBy(id)

  }

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
    setResponse(event.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    const newChallenge= {
     eventId: eventId,
     userId: id,
     startDate: start,
     endDate: end
    }

    dispatch(createChallenge(newChallenge))
    setEventId("")
    setLength("")
    setDates("")
    setResponse(currentDate)
    setEnd(currentDate)
    setStart(currentDate)
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
          <select id="event" value={eventId} onChange={handleEventChange}>
    <option value=""> -- Invite Users--</option>
    {users.map((user) => (
      <option key={user.id} value={user.id}>{user.userName}</option>
    ))}
  </select>
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
    </form>
    <div className="text-center">
    <button className="btn btn-primary text-center"  onClick={handleClick}>Add Challenge</button>
    </div>
  </div>
  )
}

