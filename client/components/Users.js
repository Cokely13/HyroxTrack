import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchUsers } from '../store/allUsersStore'


function Users() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.allUsers)
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <div className="text-center">
      <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}><b>Users</b></h1>
      {users ? users.map((user) => {
        return(
          <div key={(user.id)}>
           <Link to={`/users/${user.id}`}> <h1>{user.userName}  </h1></Link>

          </div>
        )
      }): <div>No Users</div>}

    </div>
  )
}

export default Users
