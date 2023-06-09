import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvent } from '../store/singleEventStore';
import { fetchSingleUser } from '../store/singleUserStore';
import Graph from './Graph';

function EventDetail() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  let history = useHistory();
  const { eventId } = useParams();
  const [adding, setAdding] = useState();
  const [time, setTime] = useState();
  const [addResult, setAddResult] = useState({});
  const [sortOrder, setSortOrder] = useState('date'); // Default sort order is by date
  const [sortDirection, setSortDirection] = useState('ascending'); // Default sort direction is ascending
  const event = useSelector((state) => state.singleEvent);
  const user = useSelector((state) => state.singleUser);
  const [showGraph, setShowGraph] = useState(true); // State to control showing/hiding the graph

  useEffect(() => {
    dispatch(fetchEvent(eventId));
  }, [dispatch, eventId]);

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  const timeStringToSeconds = (time) => {
    const [minutesPart, secondsPart] = time.split(':');
    const minutes = parseInt(minutesPart, 10);
    const seconds = parseInt(secondsPart, 10);
    return minutes * 60 + seconds;
  };

  const averageTimeInSeconds = event.results
    ? event.results.length
      ? event.results
          .map((item) => timeStringToSeconds(item.duration))
          .reduce((prev, next) => prev + next) / event.results.length
      : 0
    : 0;

    const eventsUser = event.results
    ? event.results.length
      ? event.results
          .filter((item) => item.userId == id )
      : 0
    : 0;


  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


  const handleUpdate = (e) => {
    e.preventDefault();
    setAdding(eventId);
    setAddResult({ eventId: event.id, userId: user.id, eventName: event.name, userName: user.userName, time: '' });
  };

  const handleSortDirectionChange = (e) => {
    setSortDirection(e.target.value);
  };

  const handleSortChange = (e) => {
    const selectedSortOrder = e.target.value;
    if (selectedSortOrder === sortOrder) {
      // If the same sort order is selected, toggle the sort direction
      setSortDirection((prevDirection) => (prevDirection === 'ascending' ? 'descending' : 'ascending'));
    } else {
      // If a different sort order is selected, reset the sort direction to ascending
      setSortOrder(selectedSortOrder);
      setSortDirection('ascending');
    }
  };

  const sortedResults = event.results
    ? [...event.results].sort((a, b) => {
        let comparison = 0;
        if (sortOrder === 'date') {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          comparison = dateA - dateB;
        } else if (sortOrder === 'time') {
          const timeA = timeStringToSeconds(a.duration);
          const timeB = timeStringToSeconds(b.duration);
          comparison = timeA - timeB;
        }
        return sortDirection === 'ascending' ? comparison : -comparison;
      }).filter((result) => result.userId == id)
    : [];

    const handleToggleShowGraph = () => {
      setShowGraph(!showGraph);
    };

  return (
    <div>
        <div>
          <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}><b>{event.name}</b></h1>
        <button onClick={handleToggleShowGraph} className="btn btn-secondary" style={{ position: 'absolute', left: '50px' }} >{showGraph ? 'Show Results' : 'Show Graph'}</button>
        <Link className="btn btn-info" to={`/workouts/${event.id}`} style={{ position: 'absolute', right: '50px' }} >Go to Workouts</Link>
          {showGraph ? (
          <div style= {{width: "90%", marginLeft: "auto", marginRight: "auto" }}>
          <Graph event={event} />
          </div>
            ) :  (
              <div>
          <div  style={{ paddingLeft: '15px', paddingRight: '15px', marginTop: "75px" }}>
          <div className="row">
    <div className="col-md-6 mb-3">
              {/* <label htmlFor="sortOrder" className="form-label">
                Sort By:
              </label> */}
              <select
                id="sortOrder"
                className="form-select"
                value={sortOrder}
                onChange={handleSortChange}
                style={{ width: '200px' }}
              >
                <option value="date">Date</option>
                <option value="time">Time</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <select
                id="sortDirection"
                className="form-select"
                value={sortDirection}
                onChange={handleSortDirectionChange}
                style={{ width: '200px' }}
              >
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
              </div>
            </div>
            {sortedResults.length > 0 ? (
              <table className="table table-bordered text-center profile rounded text-center add" style= {{backgroundColor:"rgb(211, 211, 211)"}}>
                <thead>
                  <tr style= {{fontSize:"30px"}}>
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Time</th>
                    <th scope="col">Pass</th>
                  </tr>
                </thead>
                <tbody style= {{fontSize:"20px"}}>
                  {sortedResults.map((result) => (
                    <tr key={result.id}>
                      <td>{result.date}</td>
                      <td>{result.userName}</td>
                      <td style={{ color: result.duration > event.targetTime ? 'red' : 'blue' }}>{result.duration}</td>
                      <td style={{ color: result.duration > event.targetTime ? 'red' : 'blue' }}>
                        {result.duration > event.targetTime ? (
                          <span className="bi bi-x-octagon "></span>
                        ) : (
                          <span className="bi bi-check-circle"></span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No Results</div>
            )}
          </div>
          </div>
        )}
        </div>
    </div>
  );
}

export default EventDetail;

