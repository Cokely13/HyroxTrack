import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchChallenge } from '../store/singleChallengeStore';
import { fetchUsers } from '../store/allUsersStore';

function ChallengeDetails() {
  const dispatch = useDispatch();
  const challenge= useSelector((state) => state.singleChallenge);
  const users= useSelector((state) => state.allUsers);

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
    <div>
      <h2>Challenge Details</h2>
      {challenge ? <div><p>{challenge.active}</p>
      <p>Champ: { challenge.champ ? getChampName(challenge.champ) : "no champ"}</p>
      <p>Number of Invites:{challenge.invites ? challenge.invites.length : ""}</p>
      <p>Invited Users: {challenge.invites ? getInvitedUserNames(challenge.invites): 'No invites'}</p>
                  <p>Number of Results: {challenge.results ?challenge.results.length : ""}</p>
                   <p>Start Date: {challenge.startDate ?challenge.startDate.slice(0, 10) : ""}</p></div> :
                  <div>No Challenge Details Available</div>}
      <Link to={`/mychallenges`}>
        Back to My Challenges
        </Link>
    </div>
  );
}

export default ChallengeDetails;
