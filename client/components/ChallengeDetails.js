import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchChallenge } from '../store/singleChallengeStore';

function ChallengeDetails() {
  const dispatch = useDispatch();
  const challenge= useSelector((state) => state.singleChallenge);

  const { challengeId } = useParams();

  useEffect(() => {
    dispatch(fetchChallenge(challengeId));
  }, [dispatch, challengeId]);

  return (
    <div>
      <h2>Challenge Details</h2>
      <p>{challenge.active}</p>
      <p>{challenge.champ ? challenge.champ : "no champ"}</p>
      <Link to={`/mychallenges`}>
        Back to Week View
        </Link>
    </div>
  );
}

export default ChallengeDetails;
