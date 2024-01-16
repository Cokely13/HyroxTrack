import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchChallenges } from '../store/allChallengesStore';
import { fetchSingleUser } from '../store/singleUserStore';
import ChallengeTimer from './ChallengeTimer';

function UpcomingChallenges() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const challenges = useSelector((state) => state.allChallenges);

  useEffect(() => {
    dispatch(fetchChallenges());
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  // const getNearestUpcomingChallenge = () => {
  //   const now = new Date();
  //   return challenges
  //     .filter(challenge => challenge.active === true && challenge.invites.includes(id))
  //     .reduce((nearestChallenge, currentChallenge) => {
  //       const currentDate = new Date(currentChallenge.endDate);
  //       if (!nearestChallenge || currentDate > now && currentDate < new Date(nearestChallenge.endDate)) {
  //         return currentChallenge;
  //       }
  //       return nearestChallenge;
  //     }, null);
  // };

  const getNearestUpcomingChallenge = () => {
    const now = new Date();
    return challenges
      .filter(challenge =>
        challenge.active === true &&
        challenge.invites.includes(id) &&
        new Date(challenge.endDate) > now) // Check if endDate is in the future
      .reduce((nearestChallenge, currentChallenge) => {
        const currentDate = new Date(currentChallenge.endDate);
        if (!nearestChallenge || currentDate < new Date(nearestChallenge.endDate)) {
          return currentChallenge;
        }
        return nearestChallenge;
      }, null);
  };

  const nearestChallenge = getNearestUpcomingChallenge();




  return (
    <div style={{ textAlign: 'center' }}>
      {/* <h1>Upcoming Challenges</h1> */}
      {nearestChallenge ?
        <div>
          <ul>
            <b># of Challenges:</b> <Link to={'/mychallenges'}> {challenges.filter((challenge) => challenge.active == true && challenge.invites.includes(id)).length}</Link>
          </ul>
          <h2>Next Challenge Countdown: </h2>
          <ChallengeTimer targetDate={nearestChallenge.endDate} /></div>
          :
        <p>No upcoming challenges</p> }

    </div>
  );
}

export default UpcomingChallenges;

