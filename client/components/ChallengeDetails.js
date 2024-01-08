import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchChallenge } from '../store/singleChallengeStore';
import { fetchUsers } from '../store/allUsersStore';
import ChallengeTimer from './ChallengeTimer';
import { updateSingleChallenge } from '../store/singleChallengeStore';

function ChallengeDetails() {
  const dispatch = useDispatch();
  const challenge= useSelector((state) => state.singleChallenge);
  const {id} = useSelector((state) => state.auth )
  const users= useSelector((state) => state.allUsers);

  const { challengeId } = useParams();

  console.log("challenge", challenge)

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

  return (
    <div >
      <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}>
      <b>Challenge Details</b>
      </h1>
      <div className="text-center" style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto"}}>
      {challenge ? <div><p>{challenge.active}</p>
      <p>Champ: { challenge.champ ? getChampName(challenge.champ) : "no champ"}</p>
      <p>Number of Invites:{challenge.invites ? challenge.invites.length : ""}</p>
      <p>Invited Users: {challenge.invites ? getInvitedUserNames(challenge.invites): 'No invites'}</p>
                  <p>Number of Results: {challenge.results ?challenge.results.length : ""}</p>
                   <p>Start Date: {challenge.startDate ?challenge.startDate.slice(0, 10) : ""}</p></div> :
                  <div>No Details</div>}
                  <div>{challenge.description}</div>
                  <div>Created By {getChampName(challenge.userId)}</div>
                  <td><ChallengeTimer targetDate={challenge.endDate} /></td>

          {id == challenge.userId ? <div> Hey</div> : <div>No</div>}
      <Link to={`/mychallenges`}>
        Back to My Challenges
        </Link>
        </div>
    </div>
  );
}

export default ChallengeDetails;
