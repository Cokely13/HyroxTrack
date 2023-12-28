// import React from 'react'
// import { Link, useHistory } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { useEffect, useState } from 'react'
// import { fetchSingleUser } from '../store/singleUserStore'
// import { deleteResult } from '../store/allResultsStore'
// import { fetchChallenges } from '../store/allChallengesStore'
// import { updateSingleResult } from '../store/singleResultsStore'
// import { fetchEvents } from '../store/allEventsStore'
// import ChallengeTimer from './ChallengeTImer'

// function UpcomingChallenges() {
//   const dispatch = useDispatch()
//   let history = useHistory();
//   const {id} = useSelector((state) => state.auth )
//   const user = useSelector((state) => state.singleUser )
//   const challenges = useSelector((state) => state.allChallenges )

//   useEffect(() => {
//     dispatch(fetchChallenges())
//     // Safe to add dispatch to the dependencies array
//   }, [])

//   useEffect(() => {
//     dispatch(fetchSingleUser(id))
//     // Safe to add dispatch to the dependencies array
//   }, [])


//   const upcomingChallenges = challenges.filter(challenge =>
//     challenge.active === true && challenge.invites.includes(id)
//   );

//   return (
//     <div>
//       <h1>Upcoming Challenges</h1>
//       {upcomingChallenges.length > 0 ? (
//         <ul>
//           <li># of Challenges: {upcomingChallenges.length} </li>
//         </ul>
//       ) : (
//         <p>No upcoming challenges.</p>
//       )}
//     </div>
//   );
// }

// export default UpcomingChallenges;

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

  const getNearestUpcomingChallenge = () => {
    const now = new Date();
    return challenges
      .filter(challenge => challenge.active === true && challenge.invites.includes(id))
      .reduce((nearestChallenge, currentChallenge) => {
        const currentDate = new Date(currentChallenge.endDate);
        if (!nearestChallenge || currentDate > now && currentDate < new Date(nearestChallenge.endDate)) {
          return currentChallenge;
        }
        return nearestChallenge;
      }, null);
  };

  const nearestChallenge = getNearestUpcomingChallenge();

  return (
    <div>
      <h1>Upcoming Challenges</h1>
      {nearestChallenge ? (
        <>
          <ul>
            <li># of Challenges: <Link to={'/mychallenges'}> {challenges.length}</Link></li>
          </ul>
          <h2>Next Challenge Countdown</h2>
          <ChallengeTimer targetDate={nearestChallenge.endDate} />
        </>
      ) : (
        <p>No upcoming challenges.</p>
      )}
    </div>
  );
}

export default UpcomingChallenges;

