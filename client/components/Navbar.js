import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    {/* <div classNameName='test'></div> */}
    {/* <img src={Logo}/> */}

    <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}} >
      {isLoggedIn ? (
        <div className="navbar-brand" >
          <ul className="navbar-nav">
          <li className="nav-item active">
        <a className="nav-link" href="/home">Home</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="/events" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Events
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <a className="dropdown-item" href="/events">All</a>
        <a className="dropdown-item" href="/events/1">SkiErg</a>
          <a className="dropdown-item" href="/events/2">SledPush</a>
          <a className="dropdown-item" href="/events/3">SledPull</a>
          <a className="dropdown-item" href="/events/4">Burpee Broad Jumps</a>
          <a className="dropdown-item" href="/events/5">Rowing</a>
          <a className="dropdown-item" href="/events/6">Farmers Carry</a>
          <a className="dropdown-item" href="/events/7">Sandbag Lunges</a>
          <a className="dropdown-item" href="/events/8">Wall Balls</a>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/results">Results</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="/events" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Users
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <a className="dropdown-item" href="/users">All</a>
        <a className="dropdown-item" href="/users/2">Jamal</a>
        <a className="dropdown-item" href="/users/1">Ryan</a>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/target">Target Times</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/myresults">MyResults</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/profile">Profile</a>
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
