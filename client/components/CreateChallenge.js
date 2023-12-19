

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { createChallenge} from '../store/allChallengesStore'
import { fetchSingleUser } from '../store/singleUserStore'
import { fetchEvents } from '../store/allEventsStore'


export default function CreateChallenge() {
  const currentDate = new Date().getTime()
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )
  const [name, setName] = useState();
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

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);


  const toggleInvite = (event, userId) => {
    event.preventDefault();  // prevent the default button click behavior
    console.log("invite", invite)
    if (invite.includes(userId)) {
      setInvite(invite.filter(id => id !== userId));
    } else {
      setInvite([...invite, userId]);
    }
}

  const isSelected = (userId) => {
    return invite.includes(userId);
  }


  const handleChange = (event) => {
    event.preventDefault()
    setName(event.target.value)
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

  // const handleChange6 = (event) => {
  //   event.preventDefault()
  //   setLimit(event.target.value)
  // }

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
    const newTrip = {
      name: name,
      location: location,
      length: length,
      invite: invite,
      startDate: start,
      endDate: end,
      responseDate: response,
      createdBy: createdBy,
    }

    dispatch(createTrip(newTrip))
    history.push('/list');
    setName("")
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
        <label> <h2 htmlFor="name" style={{marginRight: "10px"}}>Trip Name: </h2></label>
          <input name='name' onChange={handleChange}  type="text" placeholder="Name"/>
        </div>
        {name?
        <div >
          <label> <h2 htmlFor="location" style={{marginRight: "10px"}}>Location: </h2></label>
          <input name='location' onChange={handleChange2}  type="text" placeholder="Location"/> </div> : <div></div>}
        {location?
        <div>
        <label> <h2 htmlFor="length" style={{marginRight: "10px"}}>Length of Trip: </h2></label>
          <input name='length' onChange={handleChange3}  type="text" placeholder="Days"/>
        </div>: <div></div>}
        {length?
        <div>
          <label> <h2 htmlFor="invite" style={{ marginRight: "10px" }}>Invites: </h2></label>
          {users.map(user => (
           <button
           key={user.id}
           className={`btn ${isSelected(user.id) ? "btn-primary" : "btn-secondary"}`}
           onClick={(event) => toggleInvite(event, user.id)}   // pass the event to the function
       >
           {user.username}
           </button>
          ))}
        </div>
      : <div></div>}
        {invite?
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
            </div>: <div></div>}
            {invite?
              <div>
              <label>
                <h2 htmlFor="end" style={{marginRight: "10px"}}>End Date: </h2>
              </label>

              (
             <>
               <input
                 type="date"
                 id="dateInput"
                 value={new Date(end).toISOString().split('T')[0]}
                 onChange={handleChange5}
               />
               <button className="btn btn-primary" style={{marginLeft: "10px"}} onClick={handleToggleDateSelection}>
                 Cancel
               </button>
             </>
           )
            </div>: <div></div>}
        {invite?
        <div>
        <label>
          <h2 htmlFor="response" style={{marginRight: "10px"}}>Respond By: </h2>
        </label>

        (
       <>
         <input
           type="date"
           id="dateInput"
           value={new Date(response).toISOString().split('T')[0]}
           onChange={handleChange7}
         />
         <button className="btn btn-primary" style={{marginLeft: "10px"}} onClick={handleToggleDateSelection}>
           Cancel
         </button>
       </>
     )
      </div>: <div></div>}
      </div>
    </form>
    <div className="text-center">
    <button className="btn btn-primary text-center"  onClick={handleClick}>Add Trip</button>
    </div>
  </div>
  )
}

