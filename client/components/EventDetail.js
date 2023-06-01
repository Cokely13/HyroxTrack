import React from 'react'
import { Link, useParams, useHistory  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { fetchEvent } from '../store/singleEventStore'
import {fetchSingleUser} from '../store/singleUserStore'
import { createResult } from '../store/allResultsStore'

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




  const handleUpdate =(e) => {
    e.preventDefault()
    setAdding(eventId)
    setAddResult({eventId: event.id, userId: user.id, eventName: event.name, userName: user.userName, time: ""})
  }

  const cancelAdd =(event) => {
    event.preventDefault()
    setAdding("")
  }

  const handleChange =(event) => {
    event.preventDefault()

  }

  const handleChange3 =(event) => {
    event.preventDefault()
    setTime(event.target.value)
  }

  const handleClick =(e) => {
    e.preventDefault()
    addResult.time = time

    dispatch(createResult(addResult))
    history.push(`/events`)
  }

  return (
    <div >
      {adding == eventId?  <div >
    <form>
      <div className ="row text-center">
        <div>
        <label> <h2 htmlFor="username" style={{marginRight: "10px"}}>User Name: </h2></label>
          <input className='text-center' name='name' onChange={handleChange}  type="text" value={user.userName}/>
        </div>
        <div>
          <label><h2 htmlFor="time" style={{marginRight: "10px"}}>Time:  </h2></label>
          <input className='text-center' name='time' onChange={handleChange3}  type="text"  />
          </div>
        <div>
        <label><h2 htmlFor="username" style={{marginRight: "10px"}}>Event Name: </h2></label>
          <input className='text-center' name='eventname' onChange={handleChange3}  type="text" value={event.name} />
        </div>
      </div>
    </form>
    <div className='text-center'>
    <button className="btn btn-primary" style={{width: "15%", marginBottom: "10px", marginRight: "30px"}}  onClick={handleClick}>Submit</button>
    <button className="btn btn-danger" style={{width: "15%", marginBottom: "10px", marginRight: "30px"}} onClick={cancelAdd} >Cancel</button>
    </div>
  </div> :
      <div>
      <h1 className="text-center">{event.name}</h1>
    <div className="card border border-5  border-warning rounded mx-auto text-center" key={event.id} style={{width:"28rem"}}>
            <Link to={`/events/${event.id}`}><img className="card-img-top border border-dark rounded" src={event.image} style={{height:"20rem", marginLeft: "auto",marginTop: "15px", marginRight:"auto"}} alt="Card image cap"></img></Link>
          <h2 className="card-title" style={{marginTop: "15px"}}>{event.name}</h2>
          <h3 className="card-text">{event.description}</h3>
         {event.targetTime ? <h3 className="card-text">Target Time: {(event.targetTime).slice(0,5)}</h3> : <div>No</div>}
         {event.results ? event.results.length ? <h3 className="card-text">Average Time: {(event.results).map(item => item.time).reduce((prev, next) => prev + next)}</h3> : <div>NADA</div> : <div>Nothing</div>}
         {/* {event.results ? <h3 className="card-text">Average Time: {(event.results[0].time).split(":") + (event.results[1].time).split(":") }</h3> : <div>NADA</div>} */}
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
               {result.time > event.targetTime ?  <tr>
                  <th scope="row">{(result.updatedAt).slice(0,10)}</th>
                  <td>{result.userName}</td>
                  <td style={{color: "red"}}> {(result.time).slice(0,5)}</td> <td style={{color: "red"}}> <span className="bi bi-x-octagon"></span></td>
                </tr>:
                <tr>
                <th scope="row">{(result.updatedAt).slice(0,10)}</th>
                <td>{result.userName}</td>
                <td style={{color: "blue"}}> {(result.time).slice(0,5)}</td>
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
