// import React, { useEffect, useState } from 'react';
// import { Link, useParams, useHistory } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchEvent } from '../store/singleEventStore';
// import { fetchSingleUser } from '../store/singleUserStore';
// import { createResult } from '../store/allResultsStore';
// import AddResult from './AddResult';

// function EventDetail() {
//   const dispatch = useDispatch();
//   const { id } = useSelector((state) => state.auth);
//   let history = useHistory();
//   const { eventId } = useParams();
//   const [adding, setAdding] = useState();
//   const [time, setTime] = useState();
//   const [addResult, setAddResult] = useState({});
//   const [sortOrder, setSortOrder] = useState('date'); // Default sort order is by date
//   const [sortDirection, setSortDirection] = useState('ascending'); // Default sort direction is ascending
//   const event = useSelector((state) => state.singleEvent);
//   const user = useSelector((state) => state.singleUser);

//   useEffect(() => {
//     dispatch(fetchEvent(eventId));
//   }, [dispatch, eventId]);

//   useEffect(() => {
//     dispatch(fetchSingleUser(id));
//   }, [dispatch, id]);

//   const timeStringToDecimal = (time) => {
//     const [minutesPart, secondsPart] = time.split(':');
//     const minutes = parseInt(minutesPart, 10);
//     const seconds = parseInt(secondsPart, 10);
//     return minutes + seconds / 60;
//   };

//   const averageTime = event.results
//     ? event.results.length
//       ? event.results
//           .map((item) => timeStringToDecimal(item.duration))
//           .reduce((prev, next) => prev + next) / event.results.length
//       : 0
//     : 0;

//   const formatTime = (time) => {
//     const minutes = Math.floor(time);
//     const seconds = Math.floor((time % 1) * 60);
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   console.log('results', event);

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     setAdding(eventId);
//     setAddResult({ eventId: event.id, userId: user.id, eventName: event.name, userName: user.userName, time: '' });
//   };

//   const handleSortDirectionChange = (e) => {
//     setSortDirection(e.target.value);
//   };

//   const handleSortChange = (e) => {
//     const selectedSortOrder = e.target.value;
//     if (selectedSortOrder === sortOrder) {
//       // If the same sort order is selected, toggle the sort direction
//       setSortDirection((prevDirection) => (prevDirection === 'ascending' ? 'descending' : 'ascending'));
//     } else {
//       // If a different sort order is selected, reset the sort direction to ascending
//       setSortOrder(selectedSortOrder);
//       setSortDirection('ascending');
//     }
//   };

//   // Sort the event results based on the selected sort order and sort direction
//   const sortedResults = event.results
//     ? [...event.results].sort((a, b) => {
//         let comparison = 0;
//         if (sortOrder === 'date') {
//           const dateA = new Date(a.date);
//           const dateB = new Date(b.date);
//           comparison = dateA - dateB;
//         } else if (sortOrder === 'time') {
//           const timeA = timeStringToDecimal(a.duration);
//           const timeB = timeStringToDecimal(b.duration);
//           comparison = timeA - timeB;
//         }
//         return sortDirection === 'ascending' ? comparison : -comparison;
//       })
//     : [];

//   return (
//     <div>
//       {adding == eventId ? (
//         <AddResult />
//       ) : (
//         <div>
//           <h1 className="text-center">{event.name}</h1>
//           <div className="card border border-5  border-warning rounded mx-auto text-center" key={event.id} style={{ width: '28rem' }}>
//             <Link to={`/events/${event.id}`}>
//               <img
//                 className="card-img-top border border-dark rounded"
//                 src={event.image}
//                 style={{ height: '20rem', marginLeft: 'auto', marginTop: '15px', marginRight: 'auto' }}
//                 alt="Card image cap"
//               />
//             </Link>
//             <h2 className="card-title" style={{ marginTop: '15px' }}>
//               {event.name}
//             </h2>
//             <h3 className="card-text">{event.description}</h3>
//             {event.targetTime ? (
//               <h3 className="card-text">Target Time: {event.targetTime.slice(0, 5)}</h3>
//             ) : (
//               <div>No</div>
//             )}
//             {event.results ? (
//               event.results.length ? (
//                 <h3 className="card-text">Average Time: {formatTime(averageTime)}</h3>
//               ) : (
//                 <div>NADA</div>
//               )
//             ) : (
//               <div>Nothing</div>
//             )}
//             <button
//               className="btn btn-primary"
//               onClick={handleUpdate}
//               style={{ width: '50%', marginLeft: 'auto', marginBottom: '15px', marginRight: 'auto' }}
//             >
//               Add Result
//             </button>
//           </div>
//           <h1 className="text-center" style={{ marginBottom: '15px', marginTop: '15px' }}>
//             <u>Results</u>
//           </h1>
//           <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
//             <div className="mb-3">
//               <label htmlFor="sortOrder" className="form-label">
//                 Sort By:
//               </label>
//               <select
//                 id="sortOrder"
//                 className="form-select"
//                 value={sortOrder}
//                 onChange={handleSortChange}
//                 style={{ width: '200px' }}
//               >
//                 <option value="date">Date</option>
//                 <option value="time">Time</option>
//               </select>
//             </div>
//             <div className="mb-3">
//     <label htmlFor="sortDirection" className="form-label">
//       Sort Direction:
//     </label>
//     <select
//       id="sortDirection"
//       className="form-select"
//       value={sortDirection}
//       onChange={handleSortDirectionChange}
//       style={{ width: '200px' }}
//     >
//       <option value="ascending">Ascending</option>
//       <option value="descending">Descending</option>
//     </select>
//   </div>
//             {sortedResults.length > 0 ? (
//               <table className="table table-bordered table-dark">
//                 <thead>
//                   <tr>
//                     <th scope="col">Date</th>
//                     <th scope="col">Name</th>
//                     <th scope="col">Time</th>
//                     <th scope="col">Pass</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sortedResults.map((result) => (
//                     <tr key={result.id}>
//                       <td>{result.date}</td>
//                       <td>{result.userName}</td>
//                       <td style={{ color: result.duration > event.targetTime ? 'red' : 'blue' }}>{result.duration}</td>
//                       <td style={{ color: result.duration > event.targetTime ? 'red' : 'blue' }}>{result.duration > event.targetTime ? <span className="bi bi-x-octagon "></span> : <span className="bi bi-check-circle"></span>}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div>No Results</div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default EventDetail;

import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvent } from '../store/singleEventStore';
import { fetchSingleUser } from '../store/singleUserStore';
import { createResult } from '../store/allResultsStore';
import AddResult from './AddResult';

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

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  console.log('results', event);

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
      })
    : [];

  return (
    <div>
      {adding == eventId ? (
        <AddResult />
      ) : (
        <div>
          <h1 className="text-center">{event.name}</h1>
          <div className="card border border-5  border-warning rounded mx-auto text-center" key={event.id} style={{ width: '28rem' }}>
            <Link to={`/events/${event.id}`}>
              <img
                className="card-img-top border border-dark rounded"
                src={event.image}
                style={{ height: '20rem', marginLeft: 'auto', marginTop: '15px', marginRight: 'auto' }}
                alt="Card image cap"
              />
            </Link>
            <h2 className="card-title" style={{ marginTop: '15px' }}>
              {event.name}
            </h2>
            <h3 className="card-text">{event.description}</h3>
            {event.targetTime ? (
              <h3 className="card-text">Target Time: {event.targetTime.slice(0, 5)}</h3>
            ) : (
              <div>No</div>
            )}
            {event.results ? (
              event.results.length ? (
                <h3 className="card-text">Average Time: {formatTime(averageTimeInSeconds)}</h3>
              ) : (
                <div>NADA</div>
              )
            ) : (
              <div>Nothing</div>
            )}
            <button
              className="btn btn-primary"
              onClick={handleUpdate}
              style={{ width: '50%', marginLeft: 'auto', marginBottom: '15px', marginRight: 'auto' }}
            >
              Add Result
            </button>
          </div>
          <h1 className="text-center" style={{ marginBottom: '15px', marginTop: '15px' }}>
            <u>Results</u>
          </h1>
          <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
            <div className="mb-3">
              <label htmlFor="sortOrder" className="form-label">
                Sort By:
              </label>
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
            <div className="mb-3">
              <label htmlFor="sortDirection" className="form-label">
                Sort Direction:
              </label>
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
            {sortedResults.length > 0 ? (
              <table className="table table-bordered table-dark">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Time</th>
                    <th scope="col">Pass</th>
                  </tr>
                </thead>
                <tbody>
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
  );
}

export default EventDetail;

