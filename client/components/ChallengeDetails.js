import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchChallenge } from '../store/singleChallengeStore';
import { fetchUsers } from '../store/allUsersStore';
import ChallengeTimer from './ChallengeTimer';
import { updateSingleChallenge } from '../store/singleChallengeStore';

function ChallengeDetails() {
  const dispatch = useDispatch();
  const currentDateTime = new Date().toISOString().slice(0, 16);
  const challenge= useSelector((state) => state.singleChallenge);
  const {id} = useSelector((state) => state.auth )
  const users= useSelector((state) => state.allUsers);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([id.toString()]);
  const [start, setStart] = useState(currentDateTime);
  const [description, setDescription] = useState(challenge.description);
  const [endDate, setEndDate] = useState(currentDateTime);
  const [errorMessage, setErrorMessage] = useState('');
  const [showNoResultsModal, setShowNoResultsModal] = useState(false);

  const { challengeId } = useParams();




  useEffect(() => {
    dispatch(fetchChallenge(challengeId));
  }, [dispatch, challengeId]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const getInvitedUserNames = (invites) => {
    return invites.map((userId, index) => {
      const user = users.find(user => user.id === userId);
      return (
        user ?
          <span key={userId}>
            {index > 0 && ', '}
            <Link to={`/users/${user.id}`}>{user.userName}</Link>
          </span>
          : 'Unknown User'
      );
    });
  };

  useEffect(() => {
    // Fetch challenge details and populate form fields if in edit mode
    if (isEditMode) {
      // Set form field states to challenge details
    }
  }, [isEditMode, challengeId, dispatch]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const  durationToSeconds = (duration) => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
  }

  const handleUpdateClick = () => {
      try {
        // Fetch results of the challenge
        const results = challenge.results;

        if (results.length > 0) {
          // Sort results by duration in seconds
          results.sort((a, b) => durationToSeconds(a.duration) - durationToSeconds(b.duration));

          // Determine the champ (user with the shortest duration)
          const champ = results[0].userId;

          const rankUpdates = results.map((result, index) => {
            return { id: result.id, rank: index + 1 };
          });

          // Prepare updated challenge data
          const updatedChallenge = {
            ...challenge,
            active: false, // Set the challenge as inactive
            champ: champ, // Update the champ of the challenge
            rankUpdates: rankUpdates,
          };

          // Dispatch the update action to Redux store
          dispatch(updateSingleChallenge(updatedChallenge));

          // Optionally, you can navigate the user away or give some feedback
          console.log('Challenge closed successfully.');
        } else {
          console.log("hey!!!")
          setShowNoResultsModal(true);
        }
      } catch (error) {
        console.error('Error closing the challenge:', error);
      }
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
  };

  const handleCloseModal = () => {
    setShowNoResultsModal(false);
  };






  const handleCheckboxChange = (event) => {
    const changedUserId = event.target.value;
    const isChecked = event.target.checked;
    setSelectedUsers(prevSelectedUsers => {
      return isChecked
        ? [...prevSelectedUsers, changedUserId]
        : prevSelectedUsers.filter(userId => userId !== changedUserId);
    });
  };

  const handleChange4 = (event) => {
    setStart(event.target.value);
  };

  const handleChange5 = (event) => {
    const newEndDate = event.target.value;
    const currentDate = new Date().toISOString().slice(0, 16);
    const selectedEndDate = new Date(newEndDate);
    const selectedStartDate = new Date(start);

    if (selectedEndDate < new Date(currentDate)) {
      setErrorMessage('End date cannot be in the past.');
      return;
    } else if (selectedEndDate < selectedStartDate) {
      setErrorMessage('End date cannot be earlier than start date.');
      return;
    }

    setEndDate(newEndDate);
    setErrorMessage('');
  };

  const handleDescriptionChange = (description) => {
    setDescription(description.target.value)
  }



  const SimpleModal = () => (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000, border: '3px solid black', width: "50%" }}>
      <p>There are no results for this challenge yet.</p>
      <button onClick={handleCloseModal}>Close</button>
    </div>
  );


  const getChampName = (champ) => {
      const user = users.find(user => user.id === champ);
      return (
        user ?
          <span key={champ}>
            <Link to={`/users/${user.id}`}>{user.userName}</Link>
          </span>
          : 'Unknown User'
      );
  };

  const handleSaveClick = (e) => {
    e.preventDefault();

    const newChallenge = {
      id: challenge.id,
      eventId: challenge.eventId,
      userId: id,
      startDate: start,
      endDate: endDate,
      invites: selectedUsers,
      description: description

    }

    dispatch(updateSingleChallenge(newChallenge))
    // Implement logic to update challenge
    // Dispatch update action to Redux store
    setIsEditMode(false);
  };

  if (isEditMode) {
    return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
    <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px", marginLeft: "auto", marginRight: "auto", width: "35%" }}>
      <b>Edit Challenge</b>
    </h1>
    <form>
      {/* User Invites Container */}
      <div className="user-invites-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '80px', width: '35%', marginLeft: 'auto', marginRight: 'auto' }}>
        {users.map((user) => (
          <div className="user-challenge"key={user.id} >
            {/* User image */}
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              margin: 'auto',
              marginTop: "5%",
              backgroundImage: user.image ? `url(${user.image})` : `url('/path/to/default/image.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              border: '3px solid black'
            }} />
            {/* User name */}
            <div style={{ margin: '10px 0' }}>{user.userName}</div>
            {/* Checkbox */}
            <div style={{ textAlign: 'center' }}>
              <input
                type="checkbox"
                id={`checkbox-${user.id}`}
                value={user.id}
                checked={selectedUsers.includes(user.id.toString())}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={`checkbox-${user.id}`}></label>
            </div>
          </div>
        ))}
      </div>



      {/* Event Description */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <label htmlFor="event">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder={challenge.description}
          />
        </div>


      {/* Date Selection */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <label><h2 htmlFor="start">Start Date:</h2></label>
          <input
            type="datetime-local"
            id="startDateInput"
            value={start}
            onChange={handleChange4}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <label><h2 htmlFor="end">End Date:</h2></label>
          <input
            type="datetime-local"
            id="endDateInput"
            value={endDate}
            onChange={handleChange5}
          />
        </div>
      </div>

      {/* Error Message Display */}
      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center', width: '100%' }}>
          {errorMessage}
        </div>
      )}
    </form>

    {/* Edit and Cancel Buttons */}
    <div className="text-center" style={{ marginBottom: '20px' }}>
      <button className="btn btn-primary" onClick={handleSaveClick}>Save Changes</button>
      <button className="btn btn-secondary" onClick={handleCancelClick} style={{ marginLeft: '10px' }}>Cancel</button>
    </div>
  </div>
);
}

  return (
    <div >
      <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}>
      <b>Challenge Details</b>
      </h1>
      <div className="text-center" style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto"}}>
      {showNoResultsModal && <SimpleModal/>}

      {challenge ? <div><p>{challenge.active}</p>
      <p><b style ={{fontSize: "25px"}}>Champ:</b>
      {challenge.champ ?<div><div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    margin: 'auto',
                    backgroundImage: `url(${users.find(user => user.id === challenge.champ).image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    border: '3px solid black'
                  }}></div>{getChampName(challenge.champ)}  </div> : <div></div>}
                  </p>
      <p><b style ={{fontSize: "25px"}}>Number of Invites:{challenge.invites ? challenge.invites.length : ""}</b></p>
      <p><b style ={{fontSize: "25px"}}>Invited Users: {challenge.invites ? getInvitedUserNames(challenge.invites): 'No invites'}</b></p>
                  <p><b style ={{fontSize: "25px"}}>Number of Results: {challenge.results ?challenge.results.length : ""}</b></p>
                   <p><b style ={{fontSize: "25px"}}>Start Date: {challenge.startDate ?challenge.startDate.slice(0, 10) : ""}</b></p></div> :
                  <div>No Details</div>}
                  <div><b style ={{fontSize: "25px"}}>Description:{challenge.description} </b></div>
                  <div><b style ={{fontSize: "25px", marginTop: "15px"}}>Created By:  {getChampName(challenge.userId)}</b></div>
                  <ChallengeTimer targetDate={challenge.endDate} />

          {id == challenge.userId && challenge.active == true  ? <div> <div style={{marginTop: "15px"}}> <button className="btn btn-primary" onClick={handleEditClick}>Edit Challenge</button></div> <div style={{marginTop: "15px"}}> <button className="btn btn-warning" onClick={handleUpdateClick}>Close Challenge</button></div> </div>: <div></div>}
          <div style={{marginLeft: "auto", marginRight: "auto", marginTop: "15px"}}>
      <Link to={`/mychallenges`}>
        Back to My Challenges
        </Link>
        </div>
        </div>
    </div>
  );
}

export default ChallengeDetails;
