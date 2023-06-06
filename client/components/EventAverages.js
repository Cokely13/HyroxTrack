


import React, { useEffect, useState } from 'react';
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

  const getDivStyle = (average, targetTime) => {
    if (average === null) {
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
              <div className="col" style={getDivStyle(getAverageTime(zone.id), zone.targetTime)}>
                <h1>{zone.name}</h1>
                <h1>{zone.targetTime.slice(0, 5)}</h1>
                {userResults.length ? (
                  <React.Fragment>
                    <h1>Average: {getAverageTime(1)}</h1>
                    {userResults
                      .filter((result) => result.eventId === zone.id)
                      .map((result) => (
                        <h1 key={result.id}>{result.duration}</h1>
                      ))}
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
