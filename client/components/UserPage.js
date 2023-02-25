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

  console.log("adadas", user)

  useEffect(() => {
    dispatch(fetchSingleUser(userId))
    // Safe to add dispatch to the dependencies array
  }, [])

  return (
    <div>
    <div>Userpage</div>
    <div>{user.userName}</div>
    {/* <img className="rounded-circle border border-5  border-dark" style={{width: "100rem"}}  src={user.image}/> */}
    <h1 className="text-center" style={{marginBottom: "15px",marginTop: "15px"}}><u>Results</u></h1>
          {user.results ?
          <div style={{paddingLeft: "15px",paddingRight: "15px"}}>
          <table className="table table-bordered  table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Event Name</th>
      <th scope="col">Time</th>
      {/* <th scope="col">Handle</th> */}
    </tr>
  </thead>
            {user.results.map((result) => {
              return (
                <tbody key={result.id}>
                <tr>
                  <th scope="row">{result.id}</th>
                  <td>{result.time}</td>
                  <td>{result.eventName}</td>
                </tr>
              </tbody>
              )

            })}
                       </table>
</div>: <div>NO Results</div>}

    </div>
  )
}


export default UserPage
