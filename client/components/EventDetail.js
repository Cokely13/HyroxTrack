import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { fetchEvent } from '../store/singleEventStore'
import {fetchSingleUser} from '../store/singleUserStore'
import { createResult } from '../store/allResultsStore'

function EventDetail() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const {  eventId } = useParams();
  const [adding, setAdding] = useState()
  const [time, setTime] = useState()
  const [addResult, setAddResult] = useState({})
  const event = useSelector((state) => state.singleEvent)
  const user = useSelector((state) => state.singleUser )

  useEffect(() => {
    dispatch(fetchEvent(eventId))
    // Safe to add dispatch to the dependencies array
  }, [])
  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])

  const handleUpdate =(e) => {
    e.preventDefault()
    setAdding(eventId)
    setAddResult({eventId: event.id, userId: user.id, eventName: event.name, userName: user.username, time: ""})
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
    console.log("chec", addResult)
  }

  const handleClick =(event) => {
    event.preventDefault()
    console.log("hey", addResult,)
    console.log("time", time,)
    addResult.time = time

    console.log("heyyyy", addResult,)
    dispatch(createResult(addResult))
    setAdding("")
  }

  return (
    <div >
      {adding == eventId?  <div >
    <form>
      <div className ="row text-center">
        <div>
        <label> <h2 htmlFor="username" style={{marginRight: "10px"}}>User Name: </h2></label>
          <input name='name' onChange={handleChange}  type="text" value={user.username}/>
        </div>
        <div>
          <label><h2 htmlFor="time" style={{marginRight: "10px"}}>Time:  </h2></label>
          <input name='time' onChange={handleChange3}  type="text"  />
          {/* <select  onChange={handleChange2} name="time" >
        <option selected value={show.channel}>{show.channel}</option>
          <option value="HBO">HBO</option>
          <option value="NETFLIX">NETFLIX</option>
          <option value="DISNEY">DISNEY</option>
          <option value="AMAZON">AMAZON</option>
          <option value="OTHER">OTHER</option>
          </select> */}
          </div>
        <div>
        <label><h2 htmlFor="username" style={{marginRight: "10px"}}>Event Name: </h2></label>
          <input name='eventname' onChange={handleChange3}  type="text" value={event.name} />
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
          <button className="btn btn-primary" onClick={handleUpdate} style={{width:"50%", marginLeft: "auto", marginBottom: "15px", marginRight:"auto"}}>Add Result</button>
          </div>
          <h1 className="text-center" style={{marginBottom: "15px",marginTop: "15px"}}><u>Results</u></h1>
          {event.results ?
          <div style={{paddingLeft: "15px",paddingRight: "15px"}}>
          <table className="table table-bordered  table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Time</th>
      <th scope="col">Name</th>
      {/* <th scope="col">Handle</th> */}
    </tr>
  </thead>
            {event.results.map((result) => {
              return (
                <tbody key={result.id}>
                <tr>
                  <th scope="row">{result.id}</th>
                  <td>{result.userName}</td>
                  <td>{result.time}</td>
                </tr>
              </tbody>
              )

            })}
                       </table>
</div>: <div>NO Results</div>}
</div>}
</div>
      )
  }

export default EventDetail
