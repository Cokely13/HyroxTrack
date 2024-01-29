
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import pic from '../../uploads/HyroxPic.jpg'
import { fetchUsers } from '../store/allUsersStore';

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch()

  // State for confirm password and error message
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };


  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const enhancedHandleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const userName = evt.target.userName.value;
    const password = evt.target.password.value;

    // Check if passwords match for Sign Up form
    if (displayName === 'Sign Up' && password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return; // Don't dispatch if passwords don't match
    }


    if (displayName === 'Login' && password !== confirmPassword) {
      setPasswordError('Incorrect Password');
      return;
    }
    // If passwords match or it's the login form, proceed with the form submission
    setPasswordError(''); // Clear any previous error messages
    handleSubmit(evt, userName, password, formName);
  };


  const backgroundStyle = {
    position: 'fixed', // Fixed position to cover the whole screen
    top: 0, // Start from the top
    left: 0, // Start from the left
    width: '100vw', // Cover the full viewport width
    height: '100vh', // Cover the full viewport height
    backgroundImage: `url(${pic})`,
    backgroundSize: 'cover', // Cover the entire viewport
    backgroundPosition: 'center', // Center the image
    backgroundRepeat: 'no-repeat', // Do not repeat the image
    zIndex: -1, // Ensure it's behind other content
  };



return (
  <div style={backgroundStyle}>
    <div className="auth-container">
      <h1 className="header">HyroxTrack</h1>
      <div className="frontPage">
        <h1><b>{displayName}</b></h1>
        {passwordError && <div className="errorMessage">{passwordError}</div>}
        {/* {passwordError && <div className="errorMessage">{passwordError}</div>} */}
        {/* <form onSubmit={enhancedHandleSubmit} name={name} className="auth-form"></form> */}
        <form onSubmit={enhancedHandleSubmit} name={name} className="auth-form">
          <div className="input-group">
            <label htmlFor="userName" style={{marginRight:"10px"}}>
              {displayName === "Login" ? "Username:" : "Create Username:"}
            </label>
            <input className="form-control" name="userName" type="text" />
          </div>

          <div className="input-group">
            <label htmlFor="password" style={{marginRight:"10px"}} >
              {displayName === "Login" ? "Password:": "Create Password:"}
            </label>
            <input className="form-control" name="password" type="password" />
          </div>

          {displayName === "Sign Up" && (
            <div className="input-group">
              <label htmlFor="confirmPassword" style={{marginRight:"10px"}}>Confirm Password: </label>
              <input
                className="form-control"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          )}

          <button className="btn btn-primary sub" type="submit">
            {displayName}
          </button>
        </form>

        <div className="link-container">
          {displayName === "Login" ? (
            <Link to="/signup">Sign Up</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, userName, password, formName) {
      evt.preventDefault();
      dispatch(authenticate(userName, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
