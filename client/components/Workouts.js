import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkouts } from '../store/allWorkoutsStore';
import { updateSingleWorkout } from '../store/singleWorkoutStore';

function Workouts() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const workouts = useSelector((state) => state.allWorkouts);

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch]);

  const handleCheckboxChange = (workout) => {
    const updatedWorkout = { ...workout, done: !workout.done };
    dispatch(updateSingleWorkout(updatedWorkout));
  };

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch, workouts]);

  // Sort the workouts based on their ID
  const sortedWorkouts = workouts.slice().sort((a, b) => a.id - b.id);

  return (
    <div>
      <h1 className="text-center" style={{ marginBottom: '15px', marginTop: '15px' }}>
        <u>Workouts</u>
      </h1>
      {sortedWorkouts.length > 0 ? (
        <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
          <table className="table table-bordered table-dark text-center">
            <thead>
              <tr>
                <th>
                  <div>Event</div>
                </th>
                <th scope="col">Description</th>
                <th scope="col">Done</th>
              </tr>
            </thead>
            <tbody>
              {sortedWorkouts.map((workout) => (
                <tr key={workout.id}>
                  <td>{workout.name}</td>
                  <td>{workout.description}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={workout.done}
                      onChange={() => handleCheckboxChange(workout)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>NO Workouts</div>
      )}
    </div>
  );
}

export default Workouts;
