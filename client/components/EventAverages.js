


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../store/allEventsStore';
import { fetchWorkouts } from '../store/allWorkoutsStore';
import { fetchSingleUser } from '../store/singleUserStore';
import { fetchResults } from '../store/allResultsStore';
import AddResult from './AddResult';

const EventAverages = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.allEvents);
  const workouts = useSelector((state) => state.allWorkouts);
  const results = useSelector((state) => state.allResults);
  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);
  const [adding, setAdding] = useState();

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchResults());
    dispatch(fetchWorkouts())
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);


  const userResults = results.filter((result) => result.userId === id);

  const getAverageTime = (eventId) => {
    const eventResults = userResults.filter((result) => result.eventId == eventId);
    if (eventResults.length > 0) {
      const totalTimes = eventResults.reduce((sum, result) => sum + parseInt(result.time), 0);
      const average = totalTimes / eventResults.length;
      return average.toFixed(2); // Limit decimal places to 2
    }
    return null;
  };

  const getRecord = (eventId) => {
    const eventResults = userResults.filter((result) => result.eventId == eventId);
    if (eventResults.length > 0) {
      const sortedResults = [...eventResults].sort((a, b) => timeStringToSeconds(a.duration) - timeStringToSeconds(b.duration));
      return sortedResults[0].duration; // Return the duration of the lowest value
    }
    return null; // Return null if no event results are found
  };


  const timeStringToSeconds = (time) => {
    const [minutesPart, secondsPart] = time.split(':');
    const minutes = parseInt(minutesPart, 10);
    const seconds = parseInt(secondsPart, 10);
    return minutes * 60 + seconds;
  };

  const formatTime = (timeInSeconds) => {
    if (timeInSeconds == null) {
      return null
    }
    else {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`};
  };

  const averageTimeInSeconds =(eventId) => {
  const eventResults = userResults.filter((result) => result.eventId == eventId);
  if (eventResults.length > 0) {
    const average = eventResults
        .map((item) => timeStringToSeconds(item.duration))
        .reduce((prev, next) => prev + next) / eventResults.length
    return average}
    return null;
  }

  const recentAverage = (eventId) => {
    const eventResults = userResults
      .filter((result) => result.eventId === eventId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    if (eventResults.length > 0) {
      const average =
        eventResults
          .map((item) => timeStringToSeconds(item.duration))
          .reduce((prev, next) => prev + next) / eventResults.length;
      return average;
    }

    return null;
  };

  const trending = (average, recent) => {
    if (average === recent) {
      return <i className="bi bi-arrow-left-right"></i>; // Equal sign
    } else if (average > recent) {
      return <i className="bi bi-arrow-up-square"></i>; // Down arrow
    } else {
      return <i className="bi bi-arrow-down-square"></i>; // Up arrow
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setAdding(true);
    // setAddResult({ eventId: event.id, userId: user.id, eventName: event.name, userName: user.userName, time: '' });
  };

  const getDivStyle = (average, targetTime) => {
    if (average == null) {
      return "col yellow" ;
    } else if (average < targetTime) {
      return "col green";
    } else {
      return "col testing";
    }
  };

  const getWorkouts = (average, targetTime) => {
    if (average == null) {
      return 1;
    } else if (average < targetTime) {
      return "col green";
    } else {
      return "1";
    }
  };

  const getNumWorkouts = (eventId) => {
   const num = events ? events.filter((event)=> event.id == eventId) : null
   const test = num[0].userworkouts ? num[0].userworkouts.filter((workout) => workout.userId == id) : null
   return test ? test.length : null
  };

  return (
    <div>
    {adding == true ? (
      <AddResult />
    ) : (
    <div className="container-fluid bg-3 text-center">
      <div className="row align-items-stretch">
        {events.length ? (
          events.map((zone) => (
            <div className="col-sm-3 mx-auto mb-4 d-flex" key={zone.id}>
              <div className={getDivStyle(formatTime(averageTimeInSeconds(zone.id)), zone.targetTime)}>
              <div><Link to={`/events/${zone.id}`}>{zone.name}</Link></div>
                <div>Target Time: {zone.targetTime.slice(0, 5)}</div>
                <div> { getWorkouts(formatTime(averageTimeInSeconds(zone.id)), zone.targetTime) == 1 ? <div className='flash'><Link to={`/workouts/${zone.id}`}>DO THESE WORKOUTS!</Link></div> : <div></div> } </div>
                <div>Workouts:{events? getNumWorkouts(zone.id) : <div></div>} </div>
                {userResults.length ? (
                  <React.Fragment>
                  {formatTime(averageTimeInSeconds(zone.id)) ? <div>
                    <div>Record: {getRecord(zone.id)}</div>
                  <div>Average: {formatTime(averageTimeInSeconds(zone.id))}  </div>
                  <div>Recent Average: {formatTime(recentAverage(zone.id))} </div>
                  <div>{trending((recentAverage(zone.id)),averageTimeInSeconds(zone.id))} </div>
                    </div>: <h1></h1>}
                  </React.Fragment>
                ) : (
                  <div></div>
                )}
                 <button
              className="btn btn-primary"
              onClick={handleUpdate}
              style={{ width: '50%', marginLeft: 'auto', marginBottom: '15px', marginRight: 'auto' }}
            >
              Add Result
            </button>
              </div>
              <div>

            </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>)}
    </div>
  );
};

export default EventAverages;
