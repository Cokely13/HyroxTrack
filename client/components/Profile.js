import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchSingleUser } from '../store/singleUserStore'

function Profile() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )

  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])

  console.log("user", user)

  return (
    <div>
    <div>Profile</div>
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

export default Profile
