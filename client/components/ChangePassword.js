import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../store/passwordReducer'; // Adjust the path as necessary

function ChangePassword({userId}) {
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector((state) => state.passwordChange);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');


// function ChangePassword({ handleSubmitPasswordChange }) {
//     const [currentPassword, setCurrentPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmNewPasswordChange = (event) => {
        setConfirmNewPassword(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if (newPassword !== confirmNewPassword) {
        alert("New passwords don't match.");
        return;
      }

      console.log("user", userId)

      // Call the thunk action
      dispatch(changePassword(userId, currentPassword, newPassword)); // Make sure userId is available in this scope
    };


    return (
        <div className="change-password-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Current Password</label>
                    <input type="password" value={currentPassword} onChange={handleCurrentPasswordChange} />
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
                </div>
                <div className="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" value={confirmNewPassword} onChange={handleConfirmNewPasswordChange} />
                </div>
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default ChangePassword;
