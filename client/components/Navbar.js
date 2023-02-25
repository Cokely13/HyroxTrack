import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    {/* <div classNameName='test'></div> */}
    {/* <img src={Logo}/> */}

    <nav className="navbar navbar-expand-lg navbar-dark  bg-dark"  >
      {isLoggedIn ? (
        <div className="navbar-brand" >
          <ul className="navbar-nav">
          <li className="nav-item active">
        <a className="nav-link" href="/home">Home</a>
      </li>
          <li className="nav-item">
        <a className="nav-link" href="/events">Events</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/results">Results</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/users">Users</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/profile">Profile</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/users">Users</a>
      </li>
      <li className="nav-item">
      <a className="nav-link" href="#" onClick={handleClick}>
            Logout
          </a>
          </li>
      </ul>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
