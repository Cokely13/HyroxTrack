import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchSingleUser } from '../store/singleUserStore'
import { fetchChallenges } from '../store/allChallengesStore'


function Profile() {
  const dispatch = useDispatch()
  let history = useHistory();
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )
  const challenges = useSelector((state) => state.allChallenges )

  console.log("user", user)

  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [dispatch,])

  useEffect(() => {
    dispatch(fetchChallenges())
    // Safe to add dispatch to the dependencies array
  }, [dispatch,])


const recentResult = () => {
  const recent = user.results ? user.results : []
    recent.sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 1);

  if (recent.length > 0) {
    return recent[0].date
  }

  return null;
};

const recentWorkout = () => {
  const recent = user.userworkouts ? user.userworkouts : []
    recent.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 1);

  if (recent.length > 0) {
    return recent[0].updatedAt.slice(0, 10)
  }

  return null;
};

  return (
    <div className="text-center">
    <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "25px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}><b>{user.userName}'s Profile</b></h1>
    <div style={{fontSize:"25px"}} >
    <div><b>Total Workouts:</b> {user.userworkouts ? user.userworkouts.length : 0}</div>
    <div><b>Total Results:</b> {user.results ? user.results.length : 0}</div>
    <div><b>Total Challenges:</b> {user.challenges ? user.challenges.length : 0}</div>
    <div><b>Champs:</b>  {user.challenges
    ? user.challenges.filter(challenge => challenge.champ === id).length
    : 0}</div>
    <div><b>Most Recent Result: </b>{recentResult()} </div>
    <div><b>Most Recent Workout: </b>{recentWorkout()} </div>
    </div>
    </div>
  )
}

export default Profile
