import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchSingleUser } from '../store/singleUserStore'


function Profile() {
  const dispatch = useDispatch()
  let history = useHistory();
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )


  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [dispatch,])

console.log("user", user)

const recentResult = () => {
  const recent = user.results ? user.results : []
    recent.sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 1);

  if (recent.length > 0) {
    console.log("reaaa", recent[0].duration)
    return recent[0].date
  }

  return null;
};

const recentWorkout = () => {
  const recent = user.userworkouts ? user.userworkouts : []
    recent.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 1);

  if (recent.length > 0) {
    console.log("reaaa", recent)
    return recent[0].updatedAt.slice(0, 10)
  }

  return null;
};

  return (
    <div className="text-center">
    <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}>{user.userName}'s Profile</h1>
    <div>Total Workouts: {user.userworkouts ? user.userworkouts.length : 0}</div>
    <div>Total Results: {user.results ? user.results.length : 0}</div>
    <div>Most Recent Result: {recentResult()} </div>
    <div>Most Recent Workout: {recentWorkout()} </div>
    </div>
  )
}

export default Profile
