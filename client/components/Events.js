import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchEvents } from '../store/allEventsStore'

function Events() {
  const dispatch = useDispatch()
  const events = useSelector((state) => state.allEvents )
  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  return (
    <div className="row text-center" style={{marginLeft: "auto",marginTop: "15px", marginRight:"auto"}}>
      {events.length ? events.map((event) => {
        return (
          <div className="card border border-5  border-warning rounded zoom" key={event.id} style={{width:"28rem", marginLeft: "30px", marginRight: "15px",marginBottom: "40px",marginTop: "40px", }}>
            <Link to={`/events/${event.id}`}><img className="card-img-top border border-dark rounded" src={event.image} style={{height:"20rem", marginLeft: "auto",marginTop: "15px", marginRight:"auto"}} alt="Card image cap"></img></Link>
          <h2 className="card-title" style={{marginTop: "15px"}}>{event.name}</h2>
          <h3 className="card-text">{event.description}</h3>
          <button className="btn btn-primary" style={{width:"50%", marginLeft: "auto", marginBottom: "15px", marginRight:"auto"}}>Add Result</button>
          </div>
      )}) : <div>HEYYYY</div> }



</div>
  )}

export default Events
