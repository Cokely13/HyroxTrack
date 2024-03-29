import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../store/allEventsStore';
import { fetchWorkouts } from '../store/allWorkoutsStore';
import { fetchUsers } from '../store/allUsersStore'

const Navbar = ({handleClick, isLoggedIn}) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.allEvents);
  const workouts = useSelector((state) => state.allWorkouts);
  const { id } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.allUsers);

  const uniqueWorkouts = [...new Map(workouts.map((workout) => [workout.name, workout])).values()];

  const customStyles = {
    navbar: {
      backgroundColor: "rgb(211, 211, 211)",
      border: "1px solid black",
    },
    navbarLink: {
      fontSize: "18px", // Adjusted default font size
    },
  };

  // Define handleMediaQueryChange outside the component
  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      // If the screen is less than 768px wide
      customStyles.navbarLink.fontSize = "15px"; // Smaller font size for small screens
    } else {
      // If the screen is wider than 768px
      customStyles.navbarLink.fontSize = "18px"; // Larger font size for large screens
    }
  };

  const mediaQuery = window.matchMedia("(max-width: 768px)");
  mediaQuery.addEventListener('change', handleMediaQueryChange);
  handleMediaQueryChange(mediaQuery); // Initial check


  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchWorkouts())
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
  <div>
    {/* <div classNameName='test'></div> */}
    {/* <img src={Logo}/> */}

    <nav className="navbar navbar-expand-lg navbar-light add" style={{backgroundColor: "rgb(211, 211, 211)"}}>
      {isLoggedIn ? (
        <div className="navbar-brand fw-bolder" >
          <ul className="navbar-nav">
          <li className="nav-item active">
        <a className="nav-link" href="/home">Home</a>
      </li>
      <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/events"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Events
                </a>
                <div className="dropdown-menu fw-bolder" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item fw-bolder" href="/events">
                    All
                  </a>
                  {events.map((event) => (
                    <a className="dropdown-item fw-bolder" href={`/events/${event.id}`} key={event.id}>
                      {event.name}
                    </a>
                  ))}
                </div>
              </li>
      {/* <li className="nav-item">
        <a className="nav-link" href="/results">Results</a>
      </li> */}
      <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/events"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Users
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item fw-bolder" href="/users">
                    All
                  </a>
                  {users.map((user) => (
                    <a className="dropdown-item fw-bolder" href={`/users/${user.id}`} key={user.id}>
                      {user.userName}
                    </a>
                  ))}
                </div>
              </li>
      {/* <li className="nav-item">
        <a className="nav-link" href="/target">Target Times</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/mychallenges">Challenges</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/medals">Medals</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/createchallenge">Create Challenge</a>
      </li> */}
      <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/events"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Workouts
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item fw-bolder" href="/workouts">
                    All
                  </a>
                  {uniqueWorkouts.map((workout) => (
                    <a className="dropdown-item fw-bolder" href={`/workouts/${workout.eventId}`} key={workout.id}>
                      {workout.name}
                    </a>
                  ))}
                </div>
              </li>
      {/* <li className="nav-item">
        <a className="nav-link" href="/myresults">MyResults</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/profile">Profile</a>
      </li>
      <li className="nav-item">
      <a className="nav-link" href="#" onClick={handleClick}>
            Logout
          </a>
          </li> */}
      </ul>
        </div>
      ) : (
        <div className=" fw-bolder" style={{fontSize:"25px", textAlign:"right"}}>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup" style={{marginLeft:"50px", textAlign:"right"}}>Sign Up</Link>
        </div>
      )}
    </nav>
    {/* <hr /> */}
  </div>
  )
}




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
