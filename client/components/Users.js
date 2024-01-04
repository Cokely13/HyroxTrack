import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchUsers } from '../store/allUsersStore'


function Users() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.allUsers)

  console.log("users", users)
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])



return (
  <div className="text-center">
    <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px", marginLeft: "auto", marginRight: "auto", width: "35%" }}>
      <b>Users</b>
    </h1>
    <div className="users-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
    {users.length > 0 ? (
      users.map((user) => (
        <div key={user.id} className="profile rounded text-center add " style={{ marginBottom: "15px", marginTop: "25px", marginLeft: "auto", marginRight: "auto", width: "15%" }}>
        {user.image && (
           <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            margin: '10px auto 10px',
            backgroundImage: `url(${user.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
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



// return (
//   <div className="text-center">
//     <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px", marginLeft: "auto", marginRight: "auto", width: "35%" }}>
//       <b>Users</b>
//     </h1>
//     <div className="users-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
//       {users.length > 0 ? (
//         users.map((user) => (
//           <div key={user.id} className="user-profile" style={{ width: 'calc(25% - 20px)', textAlign: 'center' }}>
//             {user.image && (
//               <div className="profile-image-container" style={{ marginBottom: "15px" }}>
//                 <img src={`http://localhost:8080/${user.image}`} alt={`${user.userName}'s profile`} style={{ maxWidth: '100%', height: 'auto', borderRadius: "50%" }} />
//               </div>
//             )}
//             <Link to={`/users/${user.id}`}>
//               <h2>{user.userName}</h2>
//             </Link>
//           </div>
//         ))
//       ) : (
//         <div>No Users</div>
//       )}
//     </div>
//   </div>
// );
// }

export default Users
