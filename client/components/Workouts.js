import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchWorkouts } from '../store/allWorkoutsStore'


function Workouts() {
  const dispatch = useDispatch()
  const workouts = useSelector((state) => state.allWorkouts)
  useEffect(() => {
    dispatch(fetchWorkouts())
  }, [])

  return (
    <div className="text-center">
      <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}>Workouts</h1>
      {workouts ? workouts.map((workout) => {
        return(
          <div key={(workout.id)}>
           <Link to={`/workouts/${workout.eventId}`}> <h1>{workout.name}  </h1></Link>

          </div>
        )
      }): <div>No Workouts</div>}

    </div>
  )
}

export default Workouts
