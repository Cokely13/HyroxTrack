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
  <div >
    <h1 className="profile rounded text-center add">
      <b>Users</b>
    </h1>
    <div className="users-container">
    {users.length > 0 ? (
      users.map((user) => (
        <div key={user.id} className="profile rounded text-center add ">
        {user.image && (
           <div className="profile-image" style={{
            backgroundImage: `url(${user.image})`,
            border: '3px solid black'
          }}> </div>
        )}
        <div style={{ marginTop: "15%"}} >
        <Link to={`/users/${user.id}`}>
          <h2>{user.userName}</h2>
        </Link>
        </div>
      </div>
      ))
    ) : (
      <div>No Users</div>
    )}
  </div>
  </div>
);
}





export default Users
