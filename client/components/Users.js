import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchUsers, deleteUser  } from '../store/allUsersStore'
import DeleteUserModal from './DeleteUserModal'; // Import the modal component

function Users() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.allUsers)
  const { id, admin } = useSelector((state) => state.auth); //
    const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteClick = (user) => {
    console.log("ger")
    setSelectedUser(user);
    setShowModal(true);

  };

  const handleConfirm = (e) => {
    e.preventDefault();
    dispatch(deleteUser(selectedUser.id))
    setSelectedUser("");
    setShowModal(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setSelectedUser("");
    setShowModal(false);

    console.log("show", showModal)
  };

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])



  return (
    <div>
      <h1 className="profile rounded text-center add">
        <b>Users</b>
      </h1>
      {showModal ? <div className="users-container">
      <div>
        <h2>Are you sure you want to delete {selectedUser.userName}?</h2>
        <div>
          <button className="btn btn-warning btn-edit" onClick={handleConfirm}>Yes, Delete</button>
          <button className="btn btn-secondary btn-edit" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div> :
      <div className="users-container">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="profile rounded text-center add">
              {/* User Image */}
              {user.image && (
                <div className="profile-image" style={{
                  backgroundImage: `url(${user.image})`,
                  border: '3px solid black'
                }}> </div>
              )}
              {/* User Name */}
              <div style={{ marginTop: "15%"}}>
                <Link to={`/users/${user.id}`}>
                  <h2>{user.userName}</h2>
                </Link>
                {/* Delete Button for Admin */}
                {admin && (
                  <button className="btn btn-warning btn-edit" onClick={() => handleDeleteClick(user)}>Delete User</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No Users</div>
        )}
      </div>}

    </div>
  );
}





export default Users

// import React from 'react'
// import { Link } from 'react-router-dom'
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUsers, deleteUser } from '../store/allUsersStore';
// import DeleteUserModal from './DeleteUserModal'; // Import the modal component

// function Users() {
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.allUsers);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const handleDeleteClick = (user) => {
//     setSelectedUser(user);
//     setShowModal(true);
//   };

//   return (
//     <div>
//       <h1 className="profile rounded text-center add">
//         <b>Users</b>
//       </h1>
//       <div className="users-container">
//         {users.length > 0 ? (
//           users.map((user) => (
//             <div key={user.id} className="profile rounded text-center add">
//               {/* User Image */}
//               {user.image && (
//                 <div className="profile-image" style={{
//                   backgroundImage: `url(${user.image})`,
//                   border: '3px solid black'
//                 }}> </div>
//               )}
//               {/* User Name */}
//               <div style={{ marginTop: "15%"}}>
//                 <Link to={`/users/${user.id}`}>
//                   <h2>{user.userName}</h2>
//                 </Link>
//                 {/* Delete Button for Admin */}
//                 {user.admin && (
//                   <button onClick={() => handleDeleteClick(user)}>Delete User</button>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div>No Users</div>
//         )}
//       </div>
//       {showModal && (
//         <DeleteUserModal
//           user={selectedUser}
//           onClose={() => setShowModal(false)}
//           onDelete={() => {
//             dispatch(deleteUser(selectedUser.id));
//             setShowModal(false);
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export default Users;
