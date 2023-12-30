import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchChallenges } from '../store/allChallengesStore'
import { fetchUsers } from '../store/allUsersStore'

function Medals() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const users = useSelector((state) => state.allUsers )
  const challenges = useSelector((state) => state.allChallenges )

  useEffect(() => {
    dispatch(fetchChallenges())
    dispatch(fetchUsers())
    // Safe to add dispatch to the dependencies array
  }, [])


  return (
    <div>
    <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}><b> Medals</b></h1>
          {users?
          <div style={{paddingLeft: "15px",paddingRight: "15px"}}>
          <table className="table table-bordered  text-center profile rounded text-center add" style= {{backgroundColor:"rgb(211, 211, 211)"}}>
  <thead>
    <tr style= {{fontSize:"30px"}}>
    <th scope="col">UserName</th>
    <th scope="col">Gold</th>
      <th scope="col">Silver</th>
      <th scope="col">Bronze</th>
    </tr>
  </thead>

            {users.map((user) => {
              return (
                <tbody key={user.id} style= {{fontSize:"20px"}}>
                <tr className="text-center">
                <td scope="row">{user.userName}</td>
                <td scope="row">{user.challenges
    ? user.results.filter(result => result.rank === 1).length
    : 0}</td>
                  <td scope="row">{user.challenges
    ? user.results.filter(result => result.rank === 2).length
    : 0}</td>
                  <td scope="row">{user.challenges
    ? user.results.filter(result => result.rank === 3).length
    : 0}</td>
                </tr>
              </tbody>
              )
            })}
                       </table>
</div>: <div>NO Results</div>}

    </div>

  )
}

export default Medals
