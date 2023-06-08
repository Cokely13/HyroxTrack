import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchResults } from '../store/allResultsStore';

function Results() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const results = useSelector((state) => state.allResults);
  const [selectedEvent, setSelectedEvent] = useState('All');
  const [sortColumn, setSortColumn] = useState('date');
  const [sortOrder, setSortOrder] = useState('ascending');

  useEffect(() => {
    dispatch(fetchResults());
  }, [dispatch]);

  const handleChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  const handleSortColumnChange = (event) => {
    setSortColumn(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortResults = (data) => {
    return data.sort((a, b) => {
      if (sortColumn === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      } else if (sortColumn === 'event') {
        return a.eventName.localeCompare(b.eventName);
      } else if (sortColumn === 'time') {
        const timeA = parseInt(a.duration);
        const timeB = parseInt(b.duration);
        return timeA - timeB;
      }
      return 0;
    });
  };

  const sortedResults = sortResults([...results]);

  if (sortOrder === 'descending') {
    sortedResults.reverse();
  }

  const renderResults = selectedEvent !== 'All' ? sortedResults.filter((result) => result.eventName === selectedEvent) : sortedResults;

  return (
    <div>
      <h1 className="text-center" style={{ marginBottom: '15px', marginTop: '15px' }}>
        <u>Results</u>
      </h1>
      <div style={{ marginLeft: '35px', marginBottom: '35px' }}>
        <select onChange={handleChange} name="filterEvents" className="custom-select">
          <option value="All">Filter by Event</option>
          {results.map(({ eventName }) => eventName).filter((item, i, ar) => ar.indexOf(item) === i).map((result) => (
            <option key={result} value={result}>
              {result}
            </option>
          ))}
          <option value="All">ALL</option>
        </select>
      </div>
      <div style={{ marginLeft: '35px', marginBottom: '35px' }}>
        <select onChange={handleSortColumnChange} value={sortColumn}>
          <option disabled value="SortBy">
            Sort By
          </option>
          <option value="date">Date</option>
          <option value="event">Event</option>
          <option value="time">Time</option>
        </select>
        <select onChange={handleSortOrderChange} value={sortOrder}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
      {results ? (
        <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
          <table className="table table-bordered text-center" style= {{backgroundColor:"rgb(211, 211, 211)"}}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">
                  <div>Event </div>
                </th>
                <th scope="col">Name</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {renderResults.map((result, index) => (
                <tr key={result.id}>
                  <td>{index + 1}</td>
                  <td>{result.date}</td>
                  <td>
                    <Link to={`/events/${result.eventId}`} style={{ color: 'blue' }}>
                      {result.eventName}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/users/${result.userId}`} style={{ color: 'blue' }}>
                      {result.userName}
                    </Link>
                  </td>
                  <td>{result.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>NO Results</div>
      )}
    </div>
  );
}

export default Results;

