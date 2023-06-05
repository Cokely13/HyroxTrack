import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchResults } from '../store/allResultsStore'

function Results() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const results = useSelector((state) => state.allResults )
  const [selectedEvent, setSelectedEvent] = useState("All")
  const sorted = results.sort((a, b) => (a.eventId -b.eventId || parseInt(a.time) - parseInt(b.time)))




  useEffect(() => {
    dispatch(fetchResults())
    // Safe to add dispatch to the dependencies array
  }, [])

  const handleChange =(event) => {
    event.preventDefault()
    setSelectedEvent(event.target.value)

  }


  return (
    <div>
    <h1 className="text-center" style={{marginBottom: "15px",marginTop: "15px"}}><u>Results</u></h1>
    <div style={{marginLeft: "35px", marginBottom: "35px"}}>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
              <option value="All">Filter by Event</option>
              {results.map((({ eventName }) => eventName)).filter((item, i, ar) => ar.indexOf(item) === i).map((result) => <option key={result} value={result}>{result}</option>)}
          <option value="All">ALL</option>
              </select>
              </div>
    {results ?
    <div style={{paddingLeft: "15px",paddingRight: "15px"}}>
    <table className="table table-bordered  table-dark text-center">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Date</th>
<th scope="col">Event</th>
<th scope="col">Name</th>
<th scope="col">Time</th>
{/* <th scope="col">Handle</th> */}
</tr>
</thead>
     {selectedEvent !== "All"  ? results.filter(result=>result.eventName == selectedEvent).map((result) => {
        return (
          <tbody key={result.id}>
          <tr>
            <th scope="row">{result.id}</th>
            <th scope="row">{result.date}</th>
            <td><Link to={`/events/${result.eventId}`} style={{color:"white"}}>{result.eventName}</Link></td>
            <td><Link to={`/users/${result.userId}`} style={{color:"white"}}>{result.userName}</Link></td>
            <td>{result.duration}</td>
          </tr>
        </tbody>
        )

      }) :
      results.map((result) => {
        return (
          <tbody key={result.id}>
          <tr>
            <th scope="row">{result.id}</th>
            <th scope="row">{result.date}</th>
            <td><Link to={`/events/${result.eventId}`} style={{color:"white"}}>{result.eventName}</Link></td>
            <td><Link to={`/users/${result.userId}`} style={{color:"white"}}>{result.userName}</Link></td>
            <td>{result.duration}</td>
          </tr>
        </tbody>
        )

      }) }
                 </table>
</div>: <div>NO Results</div>}
</div>
  )
}

export default Results
