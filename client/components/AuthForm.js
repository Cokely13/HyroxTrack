
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { Link } from 'react-router-dom';
import backgroundImage from '../Images/us.jpg'
import pic from '../../uploads/HyroxPic.jpg'
// uploads/default.jpg
// /Users/RCokely/HyroxTrack/uploads/default.jpg

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  // State for confirm password and error message
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

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

    // If passwords match or it's the login form, proceed with the form submission
    setPasswordError(''); // Clear any previous error messages
    handleSubmit(evt, userName, password, formName);
  };

  const backgroundStyle = {
    backgroundImage: `url(${pic})`,
    backgroundSize: 'cover', // Cover the entire space of the element
    backgroundPosition: 'center', // Center the image
    backgroundRepeat: 'no-repeat', // Do not repeat the image
    // Optionally, set other styles such as height, etc.
  };

  return (
    <div className="auth-container" style={backgroundStyle} >
      <h1 className="profile rounded text-center add" style={{ marginBottom: '15px', marginTop: '25%', marginLeft: 'auto', marginRight: 'auto', width: '35%' }}>HyroxTrack</h1>
      <h1 className="profile rounded text-center add" style={{ marginBottom: '15px', marginTop: '15px', marginLeft: 'auto', marginRight: 'auto', width: '35%' }}>{displayName}</h1>
      <form onSubmit={enhancedHandleSubmit} name={name}>
        {displayName === "Login" ? (
          <div className="form-group">
            <label htmlFor="userName">
              <b>Username</b>
            </label>
            <input className="form-control" name="userName" type="text" />
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="userName">
              <b>Create Username</b>
            </label>
            <input className="form-control" name="userName" type="text" />
          </div>
        )}
        {displayName === "Login" ? (
          <div className="form-group">
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input className="form-control" name="password" type="password" />
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="password">
                <b>Create Password</b>
              </label>
              <input className="form-control" name="password" type="password" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <b>Confirm Password</b>
              </label>
              <input
                className="form-control"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          </div>
        )}
        <div>
          <button className="btn btn-primary" type="submit">
            {displayName}
          </button>
        </div>
        {passwordError && <div className="error-message">{passwordError}</div>}
        {error && error.response && <div className="error-message">{error.response.data}</div>}
      </form>
      {displayName === "Login" ? (
        <Link to="/signup">Sign Up</Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
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
