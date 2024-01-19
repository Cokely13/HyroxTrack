import React, { useEffect, useState, useRef,} from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchEvents } from '../store/allEventsStore';
import { fetchWorkouts } from '../store/allWorkoutsStore';
import { fetchUsers } from '../store/allUsersStore'


export default function CurtainMenu() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.allEvents);
  const workouts = useSelector((state) => state.allWorkouts);
  const users = useSelector((state) => state.allUsers);
  const { id } = useSelector((state) => state.auth);
  const { userId } = useParams()
  const [toggleNav, setToggleNav] = useState(false);
  const navRef = useRef();

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchWorkouts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch], [userId]);



  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick); // Cleanup the event listener
    };
  }, [toggleNav]);

  const toggleNavFunc = () => {
    setToggleNav(!toggleNav);
    setShowEventsDropdown(false);
  setShowWorkoutsDropdown(false);
  setShowUsersDropdown(false);
  };

  const [showEventsDropdown, setShowEventsDropdown] = useState(false);
  const [showWorkoutsDropdown, setShowWorkoutsDropdown] = useState(false);
  const [showUsersDropdown, setShowUsersDropdown] = useState(false);

  const uniqueWorkouts = [...new Map(workouts.map((workout) => [workout.name, workout])).values()];


  const toggleDropdown = (dropdownName) => {
    if (dropdownName === 'events') {
        setShowEventsDropdown(!showEventsDropdown);
        setShowWorkoutsDropdown(false);
        setShowUsersDropdown(false);
    } else if (dropdownName === 'workouts') {
        setShowWorkoutsDropdown(!showWorkoutsDropdown);
        setShowEventsDropdown(false);
            setShowUsersDropdown(false);
    } else if (dropdownName === 'users') {
        setShowUsersDropdown(!showUsersDropdown);
        setShowEventsDropdown(false);
        setShowWorkoutsDropdown(false);
    }
};

const closeAllDropdowns = () => {
  setShowEventsDropdown(false);
  setShowWorkoutsDropdown(false);
  setShowUsersDropdown(false);
  setToggleNav(false); // Also close the entire nav when close button is clicked
}

const handleDocumentClick = (e) => {
  if (toggleNav && navRef.current && !navRef.current.contains(e.target)) {
    closeAllDropdowns(); // Close the menu if click is outside
  }
};

const handleLinkClick = () => {
  closeAllDropdowns();

};

  return (
    <>
    {!toggleNav ?  <button onClick={toggleNavFunc} className="floating-btn fas fa-plus-square" style={{fontSize: "48px"}}>

      </button> : <div></div>}

      <nav className={toggleNav ? "active" : ""} ref={navRef}>
        {/* <button onClick={closeAllDropdowns} className="close-curtain">
          X
        </button> */}
        <div className="nav-item">
                    <button onClick={() => toggleDropdown('events')} className="btn btn-info">
                        Events <i className="fas fa-chevron-down"></i>
                    </button>
                    <div className={`dropdown-menu ${showEventsDropdown ? 'show' : ''}`}>
            <Link className="dropdown-item fw-bolder" to="/events" onClick={() => handleLinkClick()}>All</Link>
            {events.map((event) => (
              <Link className="dropdown-item fw-bolder" to={`/events/${event.id}`} key={event.id} onClick={() => handleLinkClick()}>
                {event.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="nav-item">
                    <button onClick={() => toggleDropdown('workouts')} className="btn btn-info">
                        Workouts <i className="fas fa-chevron-down"></i>
                    </button>
                    <div className={`dropdown-menu ${showWorkoutsDropdown ? 'show' : ''}`}>
            <Link className="dropdown-item fw-bolder" to="/workouts" onClick={() => handleLinkClick()}>All</Link>
            {uniqueWorkouts.map((workout) => (
              <Link className="dropdown-item fw-bolder" to={`/workouts/${workout.eventId}`} key={workout.id} onClick={() => handleLinkClick()}>
                {workout.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="nav-item">
                    <button onClick={() => toggleDropdown('users')} className="btn btn-info" >
                        Users <i className="fas fa-chevron-down"></i>
                    </button>
                    <div className={`dropdown-menu ${showUsersDropdown ? 'show' : ''}`}>
            <Link className="dropdown-item fw-bolder" to="/users" onClick={() => handleLinkClick()}>All</Link>
            {users.map((zone) => (
              <Link className="dropdown-item fw-bolder" to={`/users/${zone.id}`} key={zone.id} onClick={() => handleLinkClick(`/users/${zone.id}`)}>
                {zone.userName}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
