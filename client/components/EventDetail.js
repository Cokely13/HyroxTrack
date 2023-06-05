import React from 'react'
import { Link, useParams, useHistory  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { fetchEvent } from '../store/singleEventStore'
import {fetchSingleUser} from '../store/singleUserStore'
import { createResult } from '../store/allResultsStore'
import AddResult from './AddResult'

function EventDetail() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  let history = useHistory();
  const {  eventId } = useParams();
  const [adding, setAdding] = useState()
  const [time, setTime] = useState()
  const [addResult, setAddResult] = useState({})
  const event = useSelector((state) => state.singleEvent)
  const user = useSelector((state) => state.singleUser )
  // const sort = event.sort((a, b) => (parseInt(a.time) - parseInt(b.time)))

  useEffect(() => {
    dispatch(fetchEvent(eventId))
    // Safe to add dispatch to the dependencies array
  }, [])
  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])

//   function timeStringToDecimal(time) {
//     const [hoursPart, minutesPart] = time.split(":");
//     return Number(hoursPart) + Number(minutesPart) / 60;
// }

const timeStringToDecimal = (time) => {
  const [minutesPart, secondsPart] = time.split(':');
  const minutes = parseInt(minutesPart, 10);
  const seconds = parseInt(secondsPart, 10);
  return minutes + seconds / 60;
};

const averageTime = event.results
? event.results.length
  ? event.results
      .map((item) => timeStringToDecimal(item.duration))
      .reduce((prev, next) => prev + next) / event.results.length
  : 0
: 0;

const formatTime = (time) => {
  const minutes = Math.floor(time);
  const seconds = Math.floor((time % 1) * 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

console.log("results", event)

  const handleUpdate =(e) => {
    e.preventDefault()
    setAdding(eventId)
    setAddResult({eventId: event.id, userId: user.id, eventName: event.name, userName: user.userName, time: ""})
  }

  return (
    <div >
      {adding == eventId?
      <AddResult/>
  :
      <div>
      <h1 className="text-center">{event.name}</h1>
    <div className="card border border-5  border-warning rounded mx-auto text-center" key={event.id} style={{width:"28rem"}}>
            <Link to={`/events/${event.id}`}><img className="card-img-top border border-dark rounded" src={event.image} style={{height:"20rem", marginLeft: "auto",marginTop: "15px", marginRight:"auto"}} alt="Card image cap"></img></Link>
          <h2 className="card-title" style={{marginTop: "15px"}}>{event.name}</h2>
          <h3 className="card-text">{event.description}</h3>
         {event.targetTime ? <h3 className="card-text">Target Time: {(event.targetTime).slice(0,5)}</h3> : <div>No</div>}
         {event.results ? event.results.length ? <h3 className="card-text">Average Time: {formatTime(averageTime)}</h3> : <div>NADA</div> : <div>Nothing</div>}
          <button className="btn btn-primary" onClick={handleUpdate} style={{width:"50%", marginLeft: "auto", marginBottom: "15px", marginRight:"auto"}}>Add Result</button>
          </div>
          <h1 className="text-center" style={{marginBottom: "15px",marginTop: "15px"}}><u>Results</u></h1>
          {event.results ?
          <div style={{paddingLeft: "15px",paddingRight: "15px"}}>
          <table className="table table-bordered  table-dark">
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Name</th>
      <th scope="col">Pass</th>
      {/* <th scope="col">Handle</th> */}
    </tr>
  </thead>
            {(event.results.sort((a, b) => (parseInt(a.time) - parseInt(b.time))).map((result) => {
              return (
                <tbody key={result.id}>
               {result.duration > event.targetTime ?  <tr>
                  <th scope="row">{result.date}</th>
                  <td>{result.userName}</td>
                  <td style={{color: "red"}}> {result.duration}</td> <td style={{color: "red"}}> <span className="bi bi-x-octagon"></span></td>
                </tr>:
                <tr>
                <th scope="row">{result.date}</th>
                <td>{result.userName}</td>
                <td style={{color: "blue"}}> {result.duration}</td>
                 <td style={{color: "blue"}}> <span className="bi bi-check-circle"></span></td>
              </tr>

                }
              </tbody>
              )

            }))}
                       </table>
</div>: <div>NO Results</div>}
</div>}
</div>
      )
  }

export default EventDetail
