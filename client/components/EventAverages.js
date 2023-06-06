


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../store/allEventsStore';
import { fetchSingleUser } from '../store/singleUserStore';
import { fetchResults } from '../store/allResultsStore';

const EventAverages = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.allEvents);
  const results = useSelector((state) => state.allResults);
  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchResults());
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  console.log("events", events)

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

  const getDivStyle = (average, targetTime) => {
    if (average == null) {
      return { backgroundColor: 'yellow' };
    } else if (average < targetTime) {
      return { backgroundColor: 'green' };
    } else {
      return { backgroundColor: 'red', animation: 'flash 1s infinite' };
    }
  };

  return (
    <div className="container-fluid bg-3 text-center">
      <div className="row align-items-stretch">
        {events.length ? (
          events.map((zone) => (
            <div className="col-sm-3 mx-auto mb-4 d-flex" key={zone.id}>
              <div className="col" style={getDivStyle(formatTime(averageTimeInSeconds(zone.id)), zone.targetTime)}>
              <h1><Link to={`/events/${zone.id}`}>{zone.name}</Link></h1>
                <h1>{zone.targetTime.slice(0, 5)}</h1>
                {userResults.length ? (
                  <React.Fragment>
                    <h1>Average: {formatTime(averageTimeInSeconds(zone.id))} </h1>
                    <h1>Recent Average: {formatTime(recentAverage(zone.id))} </h1>
                    {/* {userResults
                      .filter((result) => result.eventId === zone.id)
                      .map((result) => (
                        <h1 key={result.id}>{result.duration}</h1>
                      ))} */}
                  </React.Fragment>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default EventAverages;