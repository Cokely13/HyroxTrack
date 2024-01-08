import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchSingleUser } from '../store/singleUserStore'
import { deleteResult } from '../store/allResultsStore'
import { updateSingleResult } from '../store/singleResultsStore'
import { fetchChallenges } from '../store/allChallengesStore'

function MyResults() {
  const dispatch = useDispatch()
  let history = useHistory();
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )
  const challenges = useSelector((state) => state.allChallenges )
  const [selectedEvent, setSelectedEvent] = useState("All")
  const [selectedEventFilter, setSelectedEventFilter] = useState("All")
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [reload, setReload] = useState(false);
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [sortColumn, setSortColumn] = useState('date');
  const [sortOrder, setSortOrder] = useState('ascending');
  const results = user.results? user.results : []

  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [reload, dispatch,])

  useEffect(() => {
    dispatch(fetchChallenges())
    // Safe to add dispatch to the dependencies array
  }, [dispatch,])

  useEffect(() => {
        if (reload) {
          dispatch(fetchSingleUser(id)); // Fetch updated user data
          setReload(false); // Reset reload to false
        }
      }, [reload, dispatch, id]);


  const handleChange =(event) => {
    event.preventDefault()
    setSelectedEventFilter(event.target.value)

  }

  const handleDelete =(event, result) => {
    event.preventDefault()
    dispatch(deleteResult(result.id))
    setReload(!reload);
  }

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
      }
      return 0;
    });
  };

  const handleEdit = (chosen) => {
    setSelectedEventId(chosen.id);
    setSelectedEvent(chosen);
    // const targetTime = events.find((event) => event.id == chosen.id)?.targetTime || '00:00';
    const [ m, s] = chosen.duration.split(':');
    setMinutes(m);
    setSeconds(s);
  };

  const handleCancel = () => {
    setSelectedEventId(null);
    setReload(!reload);
    setMinutes('00');
    setSeconds('00');
  };

  const handleSubmit = () => {
    const newTime = `${minutes}:${seconds}`;
    selectedEvent.duration = newTime
    dispatch(updateSingleResult(selectedEvent));
    setSelectedEventId(null);
    setMinutes('00');
    setSeconds('00');
    setReload(!reload);
  };

  console.log("challenges", challenges)

  const sortedResults = sortResults([...results]);


  if (sortOrder === 'descending') {
    sortedResults.reverse();
  }

  return (
    <div>
    <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}><b>{user.userName}'s Results</b></h1>
    {selectedEventId !== null? (
                  <div className='text-center'>
                    <h1>Event Name:</h1>
                    <h1>{selectedEvent.eventName}</h1>
                    <div>
                    <h1>Date:</h1>
                    <h1>{selectedEvent.date}</h1>
                    <h1>Time:</h1>
                    <select value={minutes} onChange={(e) => setMinutes(e.target.value)}>
                      {Array.from(Array(60).keys()).map((num) => (
                        <option key={num} value={num.toString().padStart(2, '0')}>
                          {num.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    :
                    <select value={seconds} onChange={(e) => setSeconds(e.target.value)}>
                      {Array.from(Array(60).keys()).map((num) => (
                        <option key={num} value={num.toString().padStart(2, '0')}>
                          {num.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    </div>
                    <div style={{marginTop: "10px"}}>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                      Submit
                    </button>
                    <button style={{marginLeft: "10px"}} className="btn btn-secondary" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                  </div>
                ) : <div>
    {user.results ? <div style={{ marginLeft: "35px", marginBottom: "35px"}}>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
              <option value="All">Filter by Event</option>
              {sortedResults.map((({ eventName }) => eventName)).filter((item, i, ar) => ar.indexOf(item) === i).map((result) => <option key={result} value={result}>{result}</option>)}
          <option value="All">ALL</option>
              </select>
              <div style={{marginBottom: '35px', marginTop: "35px" }}>
        <select onChange={handleSortColumnChange} value={sortColumn} style= {{marginRight: "10px"}}>
          <option disabled value="SortBy">
            Sort By
          </option>
          <option value="date">Date</option>
          <option value="event">Event</option>
        </select>
        <select onChange={handleSortOrderChange} value={sortOrder}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
              </div> : <div></div>}
          {user.results ?
          <div style={{paddingLeft: "15px",paddingRight: "15px"}}>
          <table className="table table-bordered  text-center profile rounded text-center add" >
  <thead>
    <tr style={{ fontSize: "30px", backgroundColor: "rgb(150, 150, 150)" }}>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">Event Name</th>
      <th scope="col">Time</th>
      <th scope="col"></th>
      <th scope="col"></th>
      {/* <th scope="col">Handle</th> */}
    </tr>
  </thead>
  <tbody  style= {{fontSize:"20px"}}>
  {selectedEventFilter !== "All" ? sortedResults.filter(result=>result.eventName == selectedEventFilter).map((result) => {
              return (

                <tr key={result.id} className="text-center">
                  <td >{result.id}</td>
                  <td>{result.date}</td>
                  <td>{ result.eventName == "Random" ? challenges.find(challenge => challenge.id == result.challengeId)?.description : result.eventName}</td>
                  <td>{result.duration}</td>
                  <td>
                  <button className="btn btn-primary" onClick={() => handleEdit(result)}>Edit Result</button>
                  </td>
                  <td>
                  <button className="btn btn-danger" onClick={(event) =>(handleDelete(event, result))} to={`/results/edit/${result.id}`} style={{color:"white"}} >Delete Result</button>
                  </td>
                </tr>
              )

            }):
            sortedResults.map((result) => {
              return (

                <tr key={result.id} className="text-center">
                  <td>{result.id}</td>
                  <td>{result.date}</td>
                  <td>{ result.eventName == "Random" ? challenges.find(challenge => challenge.id == result.challengeId)?.description : result.eventName}</td>
                  <td>{result.duration}</td>
                  <td>
                  <div className="btn btn-primary" onClick={() => handleEdit(result)} >Edit Result</div>
                  </td>
                  <td>
                  <button className="btn btn-danger" onClick={(event) =>(handleDelete(event, result))} to={`/results/edit/${result.id}`} style={{color:"white"}} >Delete Result</button>
                  </td>
                </tr>
              )
            })}
            </tbody>
                       </table>
</div>: <div>NO Results</div>}

    </div>}
    </div>
  )
}

export default MyResults


