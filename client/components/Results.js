import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchResults } from '../store/allResultsStore'

function Results() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const results = useSelector((state) => state.allResults )

  useEffect(() => {
    dispatch(fetchResults())
    // Safe to add dispatch to the dependencies array
  }, [])

  console.log("results", results)

  return (
    <div>
    <h1 className="text-center" style={{marginBottom: "15px",marginTop: "15px"}}><u>Results</u></h1>
    {results ?
    <div style={{paddingLeft: "15px",paddingRight: "15px"}}>
    <table className="table table-bordered  table-dark">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Event</th>
<th scope="col">Name</th>
<th scope="col">Time</th>
{/* <th scope="col">Handle</th> */}
</tr>
</thead>
      {results.map((result) => {
        return (
          <tbody key={result.id}>
          <tr>
            <th scope="row">{result.id}</th>
            <td>{result.eventName}</td>
            <td><Link to={`/users/{result.userId}`} style={{color:"white"}}>{result.userName}</Link></td>
            <td>{result.time}</td>
          </tr>
        </tbody>
        )

      })}
                 </table>
</div>: <div>NO Results</div>}
</div>
  )
}

export default Results
