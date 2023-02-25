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
    <div>
      {users ? users.map((user) => {
        return(
          <div key={(user.id)}>
            <h1>{user.username}  {user.id}</h1>

          </div>
        )
      }): <div>No Users</div>}

    </div>
  )
}

export default Users
