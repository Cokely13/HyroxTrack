import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { fetchEvent } from '../store/singleEventStore'
import {fetchSingleUser} from '../store/singleUserStore'
import { createResult } from '../store/allResultsStore'

function UserPage() {
  const dispatch = useDispatch()
  const {  userId } = useParams();
  const user = useSelector((state) => state.singleUser )
  const [selectedEvent, setSelectedEvent] = useState("All")



  useEffect(() => {
    dispatch(fetchSingleUser(userId))
    // Safe to add dispatch to the dependencies array
  }, [])

  const handleChange =(event) => {
    event.preventDefault()
    setSelectedEvent(event.target.value)

  }

  return (
    <div>
    {/* <img className="rounded-circle border border-5  border-dark" style={{width: "100rem"}}  src={user.image}/> */}
    <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}><b>{user.userName}'s Results</b></h1>
    {user.results ? <div style={{marginLeft: "35px", marginBottom: "35px"}}>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
              <option value="All">Filter by Event</option>
              {user.results.map((({ eventName }) => eventName)).filter((item, i, ar) => ar.indexOf(item) === i).map((result) => <option key={result} value={result}>{result}</option>)}
          <option value="All">ALL</option>
              </select>
              </div> : <div></div>}
          {user.results ?
          <div style={{paddingLeft: "15px",paddingRight: "15px"}}>
          <table className="table table-bordered text-center profile rounded text-center add" style= {{backgroundColor:"rgb(211, 211, 211)"}}>
  <thead>
    <tr style={{ fontSize: "30px", backgroundColor: "rgb(150, 150, 150)" }}>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">Event Name</th>
      <th scope="col">Time</th>
      {/* <th scope="col">Handle</th> */}
    </tr>
  </thead>
  <tbody  style= {{fontSize:"20px"}}>
  {selectedEvent !== "All"  ? user.results.filter(result=>result.eventName == selectedEvent).map((result) => {
              return (

                <tr key={result.id}>
                  <td >{result.id}</td>
                  <td >{result.date}</td>
                  <td>{result.eventName}</td>
                  <td>{result.duration}</td>
                </tr>
              )

            }):
            user.results.map((result) => {
              return (
                <tr key={result.id}>
                  <td >{result.id}</td>
                  <td >{result.date}</td>
                  <td><Link to={`/events/${result.eventId}`}>{result.eventName}</Link></td>
                  <td>{result.duration}</td>
                </tr>

              )
            })}</tbody>

                       </table>
</div>: <div>NO Results</div>}


    </div>
  )
}


export default UserPage
