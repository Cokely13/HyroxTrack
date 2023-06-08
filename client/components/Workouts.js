import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { fetchWorkouts } from '../store/allWorkoutsStore';
import { fetchSingleUser } from '../store/singleUserStore';
import { createUserWorkout } from '../store/allUserWorkoutsStore';
import { fetchEvent } from '../store/singleEventStore';

function Workouts() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const workouts = useSelector((state) => state.allWorkouts);
  const user = useSelector((state) => state.singleUser);
  const event = useSelector((state) => state.singleEvent);
  const [reload, setReload] = useState(false);
  const {  workoutId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);


  useEffect(() => {
    dispatch(fetchEvent(workoutId));
  }, [dispatch, workoutId]);

  const handleButtonClick = (workout) => {
    const userWorkout = {
      userId: id,
      workoutId: workout.id,
      eventId: workoutId,
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
        <u>{event.name} Workouts</u>
      </h1>
      {sortedWorkouts.length > 0 ? (
        <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
          <table className="table table-bordered text-center" style= {{backgroundColor:"rgb(211, 211, 211)"}}>
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">#</th>
                <th scope="col">Workout Done</th>
              </tr>
            </thead>
            <tbody>
              {sortedWorkouts.map((workout) => (
                <tr key={workout.id}>
                  <td>{workout.description}</td>
                  <td>
                    {user.userworkouts ? user.userworkouts.filter((userWorkout) => userWorkout.workoutId == workout.id).length : 0}
                    </td>
                    <td>
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

