import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { fetchWorkouts } from '../store/allWorkoutsStore';
import { fetchSingleUser } from '../store/singleUserStore';
import { createUserWorkout } from '../store/allUserWorkoutsStore';

function Workouts() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const workouts = useSelector((state) => state.allWorkouts);
  const user = useSelector((state) => state.singleUser);
  const [reload, setReload] = useState(false);
  const {  workoutId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  const handleButtonClick = (workout) => {
    const userWorkout = {
      userId: id,
      workoutId: workout.id,
      count: 1,
    };
    dispatch(createUserWorkout(userWorkout));
    setReload(!reload);
  };

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [reload, dispatch,]);

  useEffect(() => {
    if (reload) {
      dispatch(fetchSingleUser(id)); // Fetch updated user data
      setReload(false); // Reset reload to false
    }
  }, [reload, dispatch, id]);

  // Sort the workouts based on their ID
  const sortedWorkouts = workouts.filter((workout)=> workout.eventId == workoutId ).slice().sort((a, b) => a.id - b.id);

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
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody>
              {sortedWorkouts.map((workout) => (
                <tr key={workout.id}>
                  <td>{workout.name}</td>
                  <td>{workout.description}</td>
                  <td>
                    {user.userworkouts ? user.userworkouts.filter((userWorkout) => userWorkout.workoutId == workout.id).length : 0}
                    <button onClick={() => handleButtonClick(workout)}>+</button>
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

