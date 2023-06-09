import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="auth-container">
      <h1 className="profile rounded text-center add" style={{ marginBottom: '15px', marginTop: '15px', marginLeft: 'auto', marginRight: 'auto', width: '35%' }}>{displayName}</h1>
      <form onSubmit={handleSubmit} name={name}>
        <div className="form-group">
          <label htmlFor="userName">
            <medium><b>Username</b></medium>
          </label>
          <input className="form-control" name="userName" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="password">
          <medium><b>Password</b></medium>
          </label>
          <input className="form-control" name="password" type="password" />
        </div>
        <div>
          <button className="btn btn-primary" type="submit">
            {displayName}
          </button>
        </div>
        {error && error.response && <div className="error-message">{error.response.data}</div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
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
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const userName = evt.target.userName.value;
      const password = evt.target.password.value;
      dispatch(authenticate(userName, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
