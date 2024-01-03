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
          <table className="table table-bordered  text-center profile rounded text-center add">
  <thead>
    <tr style={{ fontSize: "30px", backgroundColor: "rgb(150, 150, 150)" }}>
    <th scope="col">UserName</th>
    <th scope="col">Gold</th>
      <th scope="col">Silver</th>
      <th scope="col">Bronze</th>
    </tr>
  </thead>
  <tbody style= {{fontSize:"20px"}}>
            {users.map((user) => {
              return (
                <tr key={user.id}  className="text-center">
                <td scope="row">
                <Link to={`/users/${user.id}`}>{user.userName}</Link>
          {user.image && (

            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              margin: 'auto',
              backgroundImage: `url(${user.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}> </div>

          )}</td>
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

              )
            })}
            </tbody>
                       </table>
</div>: <div>NO Results</div>}

    </div>

  )
}

export default Medals
