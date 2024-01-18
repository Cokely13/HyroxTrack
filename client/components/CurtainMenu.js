import React, {useEffect, useState}  from 'react'
import { fetchEvents } from '../store/allEventsStore';
import { fetchWorkouts } from '../store/allWorkoutsStore';
import { fetchUsers } from '../store/allUsersStore'
import { useSelector, useDispatch } from 'react-redux';

export default function CurtainMenu() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.allEvents);
  const workouts = useSelector((state) => state.allWorkouts);
  const { id } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.allUsers);
  const [toggleNav, setToggleNav] = useState(false);

  const [checkWidth, setCheckWidth] = useState(window.innerWidth);

  const uniqueWorkouts = [...new Map(workouts.map((workout) => [workout.name, workout])).values()];

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchWorkouts())
    dispatch(fetchUsers());
  }, [dispatch]);

  const checkFunc = () => {
    console.log(checkWidth);
    setCheckWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", checkFunc);

    return () => {
      window.removeEventListener("resize", checkFunc);
    };
  }, []);

  const toggleNavFunc = () => {
    console.log("toggle", toggleNav)
    setToggleNav(!toggleNav);
  };

  return (
    <>
      {checkWidth < 900 && (
        <button onClick={toggleNavFunc} className="floating-btn">
          hey
        </button>
      )}

      <nav className={toggleNav ? "active" : ""}>

       <div style={{marginBottom: "20px"}}> {checkWidth < 900 && (
          <button
          onClick={toggleNavFunc} className="close-curtain">
            X
          </button>
        )}
        </div>
        {/* <div style={{marginBottom: "80px"}}>
           <ul className="nav-item dropdown">
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

              </ul>
 <ul className="nav-item dropdown">
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
              </ul>
              <ul className="nav-item dropdown">
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
              </ul>
              </div> */}
        <a> <ul className="nav-item dropdown">
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

              </ul>
              </a>
        <a >   <ul className="nav-item dropdown">
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
              </ul></a>
        <a><ul className="nav-item dropdown">
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
              </ul></a>
        </nav>
    </>
  );
}
