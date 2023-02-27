import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchSingleUser } from '../store/singleUserStore'
import { deleteResult } from '../store/allResultsStore'

function Profile() {
  const dispatch = useDispatch()
  let history = useHistory();
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )
  const [selectedEvent, setSelectedEvent] = useState("All")

  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])

  const handleChange =(event) => {
    event.preventDefault()
    setSelectedEvent(event.target.value)

  }

  const handleDelete =(event, result) => {
    event.preventDefault()
    dispatch(deleteResult(result.id))
    history.push("/results");
  }

  console.log("user", user)


  return (
    <div>
    <div>Profile</div>
    <div>{user.userName}</div>
    {/* <img className="rounded-circle border border-5  border-dark" style={{width: "100rem"}}  src={user.image}/> */}
    <h1 className="text-center" style={{marginBottom: "15px",marginTop: "15px"}}><u>Results</u></h1>
    {user.results ? <div style={{marginLeft: "35px", marginBottom: "35px"}}>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
              <option value="All">Filter by Event</option>
              {user.results.map((({ eventName }) => eventName)).filter((item, i, ar) => ar.indexOf(item) === i).map((result) => <option key={result} value={result}>{result}</option>)}
          <option value="All">ALL</option>
              </select>
              </div> : <div></div>}
          {user.results ?
          <div style={{paddingLeft: "15px",paddingRight: "15px"}}>
          <table className="table table-bordered  table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Event Name</th>
      <th scope="col">Time</th>
      <th scope="col"></th>
      <th scope="col"></th>
      {/* <th scope="col">Handle</th> */}
    </tr>
  </thead>
  {selectedEvent !== "All" ? user.results.filter(result=>result.eventName == selectedEvent).map((result) => {
              return (
                <tbody key={result.id}>
                <tr className="text-center">
                  <th scope="row">{result.id}</th>
                  <td>{result.time}</td>
                  <td>{result.eventName}</td>
                  <td>
                  <Link className="btn btn-primary" to={`/results/edit/${result.id}`} style={{color:"white"}} >Edit Result</Link>
                  </td>
                  <td>
                  <button className="btn btn-danger" onClick={(event) =>(handleDelete(event, result))} to={`/results/edit/${result.id}`} style={{color:"white"}} >Delete Result</button>
                  </td>
                </tr>
              </tbody>
              )

            }):
            user.results.map((result) => {
              return (
                <tbody key={result.id}>
                <tr className="text-center">
                  <th scope="row">{result.id}</th>
                  <td>{result.time}</td>
                  <td>{result.eventName}</td>
                  <td>
                  <Link className="btn btn-primary" to={`/results/edit/${result.id}`} style={{color:"white"}} >Edit Result</Link>
                  </td>
                  <td>
                  <button className="btn btn-danger" onClick={(event) =>(handleDelete(event, result))} to={`/results/edit/${result.id}`} style={{color:"white"}} >Delete Result</button>
                  </td>
                </tr>
              </tbody>
              )
            })}
                       </table>
</div>: <div>NO Results</div>}

    </div>
  )
}

export default Profile
