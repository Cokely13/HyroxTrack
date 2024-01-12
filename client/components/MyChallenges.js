import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchSingleUser } from '../store/singleUserStore'
import { deleteResult } from '../store/allResultsStore'
import { fetchChallenges } from '../store/allChallengesStore'
import { updateSingleResult } from '../store/singleResultsStore'
import { fetchUsers } from '../store/allUsersStore'
import { fetchEvents } from '../store/allEventsStore'
import ChallengeTimer from './ChallengeTimer'
import AddResult from './AddResult'

function MyChallenges() {
  const dispatch = useDispatch()
  let history = useHistory();
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )
  const users = useSelector((state) => state.allUsers )
  const challenges = useSelector((state) => state.allChallenges )
  const events = useSelector((state) => state.allEvents )
  const [selectedEvent, setSelectedEvent] = useState("All")
  const [selectedEventFilter, setSelectedEventFilter] = useState("All")
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [add, setAdd] = useState("")
  const [selectedChallenge, setSelectedChallenge] = useState("")
  const [reload, setReload] = useState(false);
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [activeFilter, setActiveFilter] = useState("All");
  const [, forceUpdate] = useState();
  const [sortColumn, setSortColumn] = useState('date');
  const [sortOrder, setSortOrder] = useState('ascending');

  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [reload, dispatch,])

  useEffect(() => {
    dispatch(fetchChallenges())
    // Safe to add dispatch to the dependencies array
  }, [])

  useEffect(() => {
    dispatch(fetchEvents())
    dispatch(fetchUsers())
    // Safe to add dispatch to the dependencies array
  }, [])

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



const handleSortColumnChange = (event) => {
  setSortColumn(event.target.value);
};

const handleSortOrderChange = (event) => {
  setSortOrder(event.target.value);
};

const sortChallenges = (data) => {
  return data.sort((a, b) => {
    if (sortColumn === 'event') {
      const nameA = a.eventName || a.description || '';
      const nameB = b.eventName || b.description || '';
      return nameA.localeCompare(nameB);
    } else if (sortColumn === 'startDate') {
      const startDateA = new Date(a.startDate);
      const startDateB = new Date(b.startDate);
      return startDateA - startDateB;
    } else if (sortColumn === 'endDate') {
      const endDateA = new Date(a.endDate);
      const endDateB = new Date(b.endDate);
      return endDateA - endDateB;
    }
    return 0;
  });
};



  const handleDelete =(event, result) => {
    event.preventDefault()
    dispatch(deleteResult(result.id))
    setReload(!reload);
  }

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

  const handleAdd = (select) => {
    setSelectedChallenge(select);
   setAdd(true)
  };

  const handleSubmit = () => {
    const newTime = `${minutes}:${seconds}`;
    selectedEvent.duration = newTime
    dispatch(updateSingleResult(selectedEvent));
    history.push('/home');
    setSelectedEventId(null);
    setAdd(false)
    setMinutes('00');
    setSeconds('00');
  };



  const filteredChallenges = challenges.filter(challenge =>
    challenge.invites.includes(id) &&
    (activeFilter === "All" || challenge.active.toString() === activeFilter)
  );

  const sortedChallenges = sortChallenges([...filteredChallenges]);


  if (sortOrder === 'descending') {
    sortedChallenges.reverse();
  }

  return (
    <div>
    {add ? <AddResult selectedChallenge= {selectedChallenge}  /> :
    <div>
    <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}><b>{user.userName}'s Challenges</b></h1>
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
    {challenges ?<div> <div style={{marginLeft: "35px", marginBottom: "35px"}}>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
              <option value="All">Filter by Event</option>
              {filteredChallenges.map((({ eventId }) => eventId)).filter((item, i, ar) => ar.indexOf(item) === i).map((eventId) => <option key={eventId} value={eventId}>{events.find(event => event.id === eventId)?.name || 'Event not found'}</option>)}
          <option value="All">ALL</option>
              </select>
              </div>
              <div style={{ marginLeft: "35px", marginBottom: "35px" }}>
              <select onChange={(e) => setActiveFilter(e.target.value)} className='custom-select'>
                  <option value="All">All Challenges</option>
                  <option value="true">Active Challenges</option>
                  <option value="false">Inactive Challenges</option>
              </select>
           </div> </div> : <div></div>}
           <div style={{ marginLeft: "35px", marginBottom: '35px', marginTop: "35px" }}>
           <select onChange={handleSortColumnChange} value={sortColumn} style= {{marginRight: "10px"}}>
  <option value="SortBy">Sort By</option>
  <option value="event">Event</option>
  <option value="startDate">Start Date</option>
  <option value="endDate">End Date</option>
</select>
        <select onChange={handleSortOrderChange} value={sortOrder}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
          {user.results ?
          <div style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "15px"}}>
          <table className="table table-bordered  text-center profile rounded text-center add" style= {{backgroundColor:"rgb(211, 211, 211)"}}>
  <thead>
    <tr style={{ fontSize: "30px", backgroundColor: "rgb(150, 150, 150)" }}>
    <th scope="col">ID</th>
    <th scope="col">Active</th>
      <th scope="col">Challengers</th>
      <th scope="col">Results</th>
      <th scope="col">Start Date</th>
      <th scope="col">End Date</th>
      <th scope="col">Event Name</th>
      <th scope="col">Time Left</th>
      <th scope="col">Add Result</th>
      <th scope="col">Result</th>
      <th scope="col">Rank</th>
      <th scope="col">Champ</th>
    </tr>
  </thead>
  <tbody  style= {{fontSize:"20px"}} >
  {selectedEventFilter !== "All" ? sortedChallenges.filter(challenge=>challenge.eventId == selectedEventFilter).map((challenge) => {

              return (

                <tr key={challenge.id} className="text-center" >
                <th scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}><Link to={`/challenges/${challenge.id}`}>{challenge.id}</Link></th>
                <td scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}>{challenge.active ? <i className="fas fa-check" style={{ color: 'green' }}></i>
    : <i className="fas fa-times" style={{ color: 'red' }}></i>}</td>
                  <td çcope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}>{challenge.invites.length}</td>
                 {challenge.results ? <td scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}>{challenge.results.length}</td> : <td scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}></td>}
                  <td scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}>{challenge.startDate.slice(0, 10)}</td>
                  <td scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}>{challenge.endDate.slice(0, 10)}</td>
                  {(events.find(event => event.id === challenge.eventId)?.name == 'Random') ? <td style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}> {challenge.description} </td> : <td style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}><Link to={`/events/${challenge.eventId}`}>{events.find(event => event.id === challenge.eventId)?.name} </Link></td>}
                  <td scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "15px"}}>{!challenge.active ?  "" : <ChallengeTimer targetDate={challenge.endDate}  />}</td>
                  <td scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}>{challenge.active && (challenge.results.find(result => result.userId === id)?.duration || 'Not Done') == 'Not Done'?<button style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "15px"}}  className="btn btn-primary" onClick={() => handleAdd(challenge)}>Add Result</button> : ""}</td>
                  <td scope="row">{challenge.results.find(result => result.userId === id)?.duration || ''}</td>
                  {challenge.results ?
  (challenge.results.find(result => result.userId === id)?.rank || '') == 1 ?
    <td scope="row" style={{ paddingLeft: "15px", paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px" }}>
      <i className='fas fa-medal' style={{ fontSize: "48px", color:"gold"}} ></i>
    </td> :
    (challenge.results.find(result => result.userId === id)?.rank || '') == 2 ?
      <td scope="row" style={{ paddingLeft: "15px", paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px" }}>
        <i className='fas fa-medal' style={{ fontSize: "48px", color:"silver"}} ></i>
      </td> :
      (challenge.results.find(result => result.userId === id)?.rank || '') == 2 ?
        <td scope="row" style={{ paddingLeft: "15px", paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px" }}>
          <i className='fas fa-medal' style={{ fontSize: "48px", color:"#cd7f32"}} ></i> {/* Bronze color */}
        </td> :
        <td scope="row">
          {challenge.results.find(result => result.userId === id)?.rank || ''}
        </td>
:
<td scope="row" style={{ paddingLeft: "15px", paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px" }}></td>
}
                  <td scope="row" ><Link to={`/users/${challenge.champ}`}>{users.find(user => user.id === challenge.champ) ? <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    margin: 'auto',
                    backgroundImage: `url(${users.find(user => user.id === challenge.champ).image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    border: '3px solid black'
                  }}> </div> :"" }</Link></td>
                </tr>

              )

            }):

            sortedChallenges.map((challenge) => {
              return (

                <tr key={challenge.id} className="text-center" >
                <th scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}><Link to={`/challenges/${challenge.id}`}>{challenge.id}</Link></th>
                <td scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}>{challenge.active ? <i className="fas fa-check" style={{ color: 'green' }}></i>
    : <i className="fas fa-times" style={{ color: 'red' }}></i>}</td>
                  {challenge.results ? <td çcope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}>{challenge.invites.length}</td>: <td scope="row"></td>}
                  {challenge.results ? <td scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}>{challenge.results.length}</td> : <td scope="row"></td>}
                  <td scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}>{challenge.startDate.slice(0, 10)}</td>
                  <td scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}>{challenge.endDate.slice(0, 10)}</td>
                   {(events.find(event => event.id === challenge.eventId)?.name == 'Random') ? <td scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}> {challenge.description} </td> : <td style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}><Link to={`/events/${challenge.eventId}`}>{events.find(event => event.id === challenge.eventId)?.name} </Link></td>}
                  <td scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "15px"}}>{!challenge.active ?  "" : <ChallengeTimer targetDate={challenge.endDate}  />}</td>
                  {challenge.results ? <td scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}>{challenge.active && (challenge.results.find(result => result.userId === id)?.duration || 'Not Done') == 'Not Done'?<button  style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "15px"}} className="btn btn-primary" onClick={() => handleAdd(challenge)}>Add Result</button> : ""}</td> : <td scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}></td>}
                  {challenge.results ? <td scope="row">{challenge.results.find(result => result.userId === id)?.duration || ''}</td>: <td scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}></td>}
                  {challenge.results ?
  (challenge.results.find(result => result.userId === id)?.rank || '') == 1 ?
    <td scope="row" style={{ paddingLeft: "15px", paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px" }}>
      <i className='fas fa-medal' style={{ fontSize: "48px", color:"gold"}} ></i>
    </td> :
    (challenge.results.find(result => result.userId === id)?.rank || '') == 2 ?
      <td scope="row" style={{ paddingLeft: "15px", paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px" }}>
        <i className='fas fa-medal' style={{ fontSize: "48px", color:"silver"}} ></i>
      </td> :
      (challenge.results.find(result => result.userId === id)?.rank || '') == 2 ?
        <td scope="row" style={{ paddingLeft: "15px", paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px" }}>
          <i className='fas fa-medal' style={{ fontSize: "48px", color:"#cd7f32"}} ></i> {/* Bronze color */}
        </td> :
        <td scope="row">
          {challenge.results.find(result => result.userId === id)?.rank || ''}
        </td>
:
<td scope="row" style={{ paddingLeft: "15px", paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px" }}></td>
}
                  {challenge.results ? <td scope="row" ><Link to={`/users/${challenge.champ}`}>{users.find(user => user.id === challenge.champ) ?    <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    margin: 'auto',
                    backgroundImage: `url(${users.find(user => user.id === challenge.champ).image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    border: '3px solid black'
                  }}> </div> :"" }</Link></td>: <td scope="row" style={{paddingLeft: "15px",paddingRight: "15px", paddingBottom: "15px", paddingTop: "25px"}}></td>}
                </tr>

              )
            })}
          </tbody>
                       </table>
</div>: <div>NO Results</div>}

    </div>}
    </div>}
    </div>
  )
}

export default MyChallenges


