import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchEvents } from '../store/allEventsStore'
import {fetchSingleUser} from '../store/singleUserStore'
import { createResult } from '../store/allResultsStore'
import AddResult from './AddResult'
import Predictor from './Predictor'

function Events() {
  const dispatch = useDispatch()
  const events = useSelector((state) => state.allEvents )
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )
  const [adding, setAdding] = useState()
  const [time, setTime] = useState()
  const [eventName, setEventName] = useState()
  const [addResult, setAddResult] = useState({})


  const targets = user.targets? user.targets : null
  useEffect(() => {
    dispatch(fetchEvents())
  }, [])
  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])


  const handleUpdate =(event, zone) => {
    event.preventDefault()
    setAdding("add")
    setEventName(zone.name)
    setAddResult({eventId: zone.id, userId: user.id, eventName: zone.name, userName: user.userName, time: ""})
  }

  const cancelAdd =(event) => {
    event.preventDefault()
    setAdding("")
  }



  const handleChange3 =(event) => {
    event.preventDefault()
    setTime(event.target.value)
  }

  const handleClick =(event) => {
    event.preventDefault()
    addResult.time = time

    dispatch(createResult(addResult))
    setAdding("")
  }

  const filteredEvents= events.filter((event) => event.name !== "Random");

  return (
    <div>
    {adding == "add"?


    <Predictor/>
    :
    <div >
    <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}><b>Events</b></h1>
    <div className="events-container" style={{marginLeft: "auto",marginTop: "15px", marginRight:"auto"}}>
      {events.length ? filteredEvents.map((zone) => {
        return (
          <div className="event-card" key={zone.id} style={{width:"30rem", marginBottom: "40px",marginTop: "40px", }}>
            <Link to={`/events/${zone.id}`}><img className="card-img-top border border-dark rounded" src={zone.image} style={{height:"20rem", marginLeft: "auto",marginTop: "15px", marginRight:"auto"}} alt="Card image cap"></img></Link>
          <h2 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto", width: "70%" }}>{zone.name}</h2>

          <h3 className="card-text">{zone.description}</h3>
          <h3 className="card-text">Target Time:{targets ? (<div> {targets.find(target => target.eventId === zone.id)?.duration|| zone.targetTime.slice(0,5)} </div>) : <div> {zone.targetTime.slice(0,5)}</div>}  </h3>
          <button className="btn btn-primary" onClick={e => handleUpdate(e, zone)} style={{width:"50%", marginLeft: "auto", marginBottom: "15px", marginRight:"auto"}}>Add Result</button>
          </div>
      )}) : <div>HEYYYY</div> }



</div></div>}
</div>

  )}

export default Events

