import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchEvents } from '../store/allEventsStore'
import {fetchSingleUser} from '../store/singleUserStore'
import { createResult } from '../store/allResultsStore'
import AddResult from './AddResult'

function Events() {
  const dispatch = useDispatch()
  const events = useSelector((state) => state.allEvents )
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )
  const [adding, setAdding] = useState()
  const [time, setTime] = useState()
  const [eventName, setEventName] = useState()
  const [addResult, setAddResult] = useState({})
  useEffect(() => {
    dispatch(fetchEvents())
  }, [])
  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])


  const handleUpdate =(event, zone) => {
    event.preventDefault()
    console.log("zone", zone)
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

  return (
    <div>
    {adding == "add"?

    <AddResult/>
    :
    <div className="row text-center" style={{marginLeft: "auto",marginTop: "15px", marginRight:"auto"}}>
      {events.length ? events.map((zone) => {
        return (
          <div className="card border border-5  border-warning rounded" key={zone.id} style={{width:"28rem", marginLeft: "30px", marginRight: "15px",marginBottom: "40px",marginTop: "40px", }}>
            <Link to={`/events/${zone.id}`}><img className="card-img-top border border-dark rounded" src={zone.image} style={{height:"20rem", marginLeft: "auto",marginTop: "15px", marginRight:"auto"}} alt="Card image cap"></img></Link>
          <h2 className="card-title" style={{marginTop: "15px"}}>{zone.name}</h2>
          <h3 className="card-text">{zone.description}</h3>
          <h3 className="card-text">Target Time: {zone.targetTime.slice(0,5)}</h3>
          <button className="btn btn-primary" onClick={e => handleUpdate(e, zone)} style={{width:"50%", marginLeft: "auto", marginBottom: "15px", marginRight:"auto"}}>Add Result</button>
          </div>
      )}) : <div>HEYYYY</div> }



</div>}
</div>

  )}

export default Events
