import React from 'react';

function DeleteUserModal({ user, onClose, onDelete }) {
  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Are you sure you want to delete {user.userName}?</h2>
        <div>
          <button onClick={onDelete}>Yes, Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserModal;
