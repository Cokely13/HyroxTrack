import React, { useEffect, useState, useRef,} from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { fetchEvents } from '../store/allEventsStore';
import { fetchWorkouts } from '../store/allWorkoutsStore';
import { fetchUsers } from '../store/allUsersStore'


export default function CurtainMenu({ isCurtainOpen, toggleCurtain }) {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.allEvents);
  const workouts = useSelector((state) => state.allWorkouts);
  const users = useSelector((state) => state.allUsers);
  const { id } = useSelector((state) => state.auth);
  const { userId } = useParams()
  let history = useHistory();
  const [toggleNav, setToggleNav] = useState(false);
  const navRef = useRef();
  const eventsDropdownRef = useRef(null);
  const workoutsDropdownRef = useRef(null);
  const usersDropdownRef = useRef(null);

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
    toggleCurtain()
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
  toggleCurtain()
}

// const handleDocumentClick = (e) => {
//   if (toggleNav && navRef.current && !navRef.current.contains(e.target)) {
//     closeAllDropdowns(); // Close the menu if click is outside
//   }
// };

const handleDocumentClick = (e) => {
  if (navRef.current && navRef.current.contains(e.target)) {
    // If the click is inside the curtain menu but not inside any dropdown
    if (
      !(eventsDropdownRef.current && eventsDropdownRef.current.contains(e.target)) &&
      !(workoutsDropdownRef.current && workoutsDropdownRef.current.contains(e.target)) &&
      !(usersDropdownRef.current && usersDropdownRef.current.contains(e.target))
    ) {
      // Close all dropdowns but keep the curtain open
      setShowEventsDropdown(false);
      setShowWorkoutsDropdown(false);
      setShowUsersDropdown(false);
    }
  } else if (toggleNav && navRef.current && !navRef.current.contains(e.target)) {
    // If the click is outside the curtain menu
    closeAllDropdowns(); // Close the curtain and all dropdowns
    toggleCurtain()
  }
};

const handleLinkClick = () => {
  closeAllDropdowns();
  toggleCurtain()
};

const goToMedals = () => {
  history.push('/medals');
  closeAllDropdowns();
};

const goToTargetTimes = () => {
  history.push('/target');
  closeAllDropdowns();
};

const goToMyResults = () => {
  history.push('/myresults');
  closeAllDropdowns();
};

const goToHome = () => {
  history.push('/home');
  closeAllDropdowns();
};

const goToProfile = () => {
  history.push('/profile');
  closeAllDropdowns();
};

const goToResults = () => {
  history.push('/results');
  closeAllDropdowns();
};

const goToChallenges = () => {
  history.push('/mychallenges');
  closeAllDropdowns();
};

const goToCreateChallenge = () => {
  history.push('/createchallenge');
  closeAllDropdowns();
};


  return (
    <>
    {!toggleNav ?  <button onClick={toggleNavFunc} className="fas fa-bars" style={{fontSize: "48px", borderRadius: "10px", marginTop: "20px", marginLeft: "20px"}}>

      </button> : <div></div>}

      <nav className={toggleNav ? "active" : ""} ref={navRef}>
        {/* <button onClick={closeAllDropdowns} className="close-curtain">
          X
        </button> */}
         <div className="nav-item">
        <button className="btn btn-dark" onClick={() => goToHome()} >Home</button>
        </div>
        <div className="nav-item">
        <button className="btn btn-dark" onClick={() => goToProfile()} >Profile</button>
        </div>
        <div className="nav-item">
        <button className="btn btn-dark" onClick={() => goToMyResults()} >My Results</button>
        </div>
        <div className="nav-item">
        <button className="btn btn-dark" onClick={() => goToChallenges()} >My Challenges</button>
        </div>
        <div className="nav-item">
        <button className="btn btn-dark" onClick={() => goToCreateChallenge()} >Create Challenge</button>
        </div>
        <div className="nav-item">
                    <button onClick={() => toggleDropdown('events')} className="btn btn-dark">
                        Events <i className="fas fa-chevron-down"></i>
                    </button>
                    <div className={`dropdown-menu ${showEventsDropdown ? 'show' : ''}`}ref={eventsDropdownRef}>
            <Link className="dropdown-item fw-bolder" to="/events" onClick={() => handleLinkClick()}>All</Link>
            {events.map((event) => (
              <Link className="dropdown-item fw-bolder" to={`/events/${event.id}`} key={event.id} onClick={() => handleLinkClick()}>
                {event.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="nav-item">
                    <button onClick={() => toggleDropdown('workouts')} className="btn btn-dark">
                        Workouts <i className="fas fa-chevron-down"></i>
                    </button>
                    <div className={`dropdown-menu ${showWorkoutsDropdown ? 'show' : ''}`} ref={workoutsDropdownRef}>
            <Link className="dropdown-item fw-bolder" to="/workouts" onClick={() => handleLinkClick()}>All</Link>
            {uniqueWorkouts.map((workout) => (
              <Link className="dropdown-item fw-bolder" to={`/workouts/${workout.eventId}`} key={workout.id} onClick={() => handleLinkClick()}>
                {workout.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="nav-item">
                    <button onClick={() => toggleDropdown('users')} className="btn btn-dark" >
                        Users <i className="fas fa-chevron-down"></i>
                    </button>
                    <div className={`dropdown-menu ${showUsersDropdown ? 'show' : ''}`}ref={usersDropdownRef}>
            <Link className="dropdown-item fw-bolder" to="/users" onClick={() => handleLinkClick()}>All</Link>
            {users.map((zone) => (
              <Link className="dropdown-item fw-bolder" to={`/users/${zone.id}`} key={zone.id} onClick={() => handleLinkClick(`/users/${zone.id}`)}>
                {zone.userName}
              </Link>
            ))}
          </div>
        </div>
        <div className="nav-item">
        <button className="btn btn-dark" onClick={() => goToMedals()} >Medals</button>
        </div>
        <div className="nav-item">
        <button className="btn btn-dark" onClick={() => goToResults()} >Results</button>
        </div>
        <div className="nav-item">
        <button className="btn btn-dark" onClick={() => goToTargetTimes()} >TargetTimes</button>
        </div>
        {/* <div className="nav-item"><Link to={`/myresults`}ref={navRef}>MyResults</Link></div>
        <div className="nav-item"><Link to={`/target`}>TargetTimes</Link></div> */}
      </nav>
    </>
  );
}
