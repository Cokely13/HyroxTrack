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
  const [, forceUpdate] = useState();

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

//   const handleResultAdded = () => {
//     setAdd(false); // Hide AddResult component
//     dispatch(fetchChallenges()); // Re-fetch challenges data to update the component with the latest information
//     setReload(!reload); // You can keep this if you need to trigger other updates
// };

const handleResultAdded = () => {
  setAdd(false); // Hide AddResult component
  dispatch(fetchChallenges())
    .then(() => {
      forceUpdate({}); // Force re-render
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
    setSelectedEventId(null);
    setMinutes('00');
    setSeconds('00');
    setReload(!reload);
  };


const filteredChallenges = challenges.filter(challenge =>
  challenge.invites.includes(id)
);


  return (
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
    {challenges ? <div style={{marginLeft: "35px", marginBottom: "35px"}}>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
              <option value="All">Filter by Event</option>
              {filteredChallenges.map((({ eventId }) => eventId)).filter((item, i, ar) => ar.indexOf(item) === i).map((eventId) => <option key={eventId} value={eventId}>{events.find(event => event.id === eventId)?.name || 'Event not found'}</option>)}
          <option value="All">ALL</option>
              </select>
              </div> : <div></div>}
          {user.results ?
          <div style={{paddingLeft: "15px",paddingRight: "15px"}}>
          <table className="table table-bordered  text-center profile rounded text-center add" style= {{backgroundColor:"rgb(211, 211, 211)"}}>
  <thead>
    <tr style= {{fontSize:"30px"}}>
    <th scope="col">Challenge ID</th>
    <th scope="col">Active</th>
      <th scope="col"># of Challengers</th>
      <th scope="col"># of Completed Challenges</th>
      <th scope="col">Start Date</th>
      <th scope="col">Event Name</th>
      <th scope="col">Time Left</th>
      <th scope="col">Add Result</th>
      <th scope="col">Challenge Done</th>
      <th scope="col">Rank</th>
      <th scope="col">Champ</th>
    </tr>
  </thead>
  {selectedEventFilter !== "All" ? filteredChallenges.filter(challenge=>challenge.eventId == selectedEventFilter).map((challenge) => {

              return (
                <tbody key={challenge.id} style= {{fontSize:"20px"}}>
                <tr className="text-center">
                <th scope="row"><Link to={`/challenges/${challenge.id}`}>{challenge.id}</Link></th>
                <td scope="row">{challenge.active ? "true" : "false"}</td>
                  <td scope="row">{challenge.invites.length}</td>
                  <td scope="row">{challenge.results.length}</td>
                  <td scope="row">{challenge.startDate.slice(0, 10)}</td>
                  <td>{events.find(event => event.id === challenge.eventId)?.name || 'Event not found'}</td>
                  <td><ChallengeTimer targetDate={challenge.endDate} /></td>
                  <td>{challenge.active &&(challenge.results.find(result => result.userId === id)?.duration || 'Not Done') == 'Not Done' ?<button  className="btn btn-primary" onClick={() => handleAdd(challenge)}>Add Result</button> : "DONE"}</td>
                  <td scope="row">{challenge.results.find(result => result.userId === id)?.duration || 'Not Done'}</td>
                  <td scope="row">{challenge.results.find(result => result.userId === id)?.rank || ''}</td>
                  <td scope="row">{users.find(user => user.id === challenge.champ) ? users.find(user => user.id === challenge.champ).userName :"" }</td>
                </tr>
              </tbody>
              )

            }):
            filteredChallenges.map((challenge) => {
              return (
                <tbody key={challenge.id} style= {{fontSize:"20px"}}>
                <tr className="text-center">
                <th scope="row"><Link to={`/challenges/${challenge.id}`}>{challenge.id}</Link></th>
                <td scope="row">{challenge.active ? "true" : "false"}</td>
                  <td scope="row">{challenge.invites.length}</td>
                  <td scope="row">{challenge.results.length}</td>
                  <td scope="row">{challenge.startDate.slice(0, 10)}</td>
                  <td>{events.find(event => event.id === challenge.eventId)?.name || 'Event not found'}</td>
                  <td><ChallengeTimer targetDate={challenge.endDate} /></td>
                  <td>{challenge.active && (challenge.results.find(result => result.userId === id)?.duration || 'Not Done') == 'Not Done'?<button  className="btn btn-primary" onClick={() => handleAdd(challenge)}>Add Result</button> : "DONE"}</td>
                  <td scope="row">{challenge.results.find(result => result.userId === id)?.duration || 'Not Done'}</td>
                  <td scope="row">{challenge.results.find(result => result.userId === id)?.rank || ''}</td>
                  <td scope="row">{users.find(user => user.id === challenge.champ) ? users.find(user => user.id === challenge.champ).userName :"" }</td>
                </tr>
              </tbody>
              )
            })}
                       </table>
</div>: <div>NO Results</div>}

    </div>}
    {add ? <AddResult selectedChallenge= {selectedChallenge} onResultAdded={handleResultAdded}  /> : <div></div>}
    </div>
  )
}

export default MyChallenges


