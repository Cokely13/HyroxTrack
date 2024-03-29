import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchWorkouts } from '../store/allWorkoutsStore';
import { fetchSingleUser } from '../store/singleUserStore';
import { createUserWorkout } from '../store/allUserWorkoutsStore';
import { createWorkout } from '../store/allWorkoutsStore';
import { fetchEvent } from '../store/singleEventStore';
import { deleteWorkout } from '../store/allWorkoutsStore';
import {updateSingleWorkout} from '../store/singleWorkoutStore'

function WorkoutDetail() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const workouts = useSelector((state) => state.allWorkouts);
  const user = useSelector((state) => state.singleUser);
  const event = useSelector((state) => state.singleEvent);
  const [reload, setReload] = useState(false);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const { workoutId } = useParams();
  const [adding, setAdding] = useState(false);
  const [editingWorkoutId, setEditingWorkoutId] = useState(null);
  const [editingDescription, setEditingDescription] = useState('');


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
  }, [reload, dispatch]);

  useEffect(() => {
    if (reload) {
      dispatch(fetchSingleUser(id)); // Fetch updated user data
      setReload(false); // Reset reload to false
    }
  }, [reload, dispatch, id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    setAdding(true);
  };

  const handleDeleteWorkout = (workoutId) => {
    const confirmed = window.confirm('Are you sure you want to delete the workout?');
    if (confirmed) {
      dispatch(deleteWorkout(workoutId));
      setReload(!reload);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newWorkout = {
      name: event.name,
      description: description,
      eventId: event.id,
    };

    dispatch(createWorkout(newWorkout));

    setDescription('');
    setAdding(false);
  };

    const handleEditWorkout = (workoutId) => {
    const workout = workouts.find((workout) => workout.id === workoutId);
    setEditingWorkoutId(workoutId);
    setEditingDescription(workout.description);
  };

    const handleSaveWorkout = () => {
    const updatedWorkout = {
      id: editingWorkoutId,
      description: editingDescription,
    };
    dispatch(updateSingleWorkout(updatedWorkout));
    setEditingWorkoutId(null);
    setReload(!reload);
  };

    const handleCancelEdit = () => {
    setEditingWorkoutId(null);
    setEditingDescription('');
  };

  const handleCancel = (e) => {
    setAdding(false);
  };

  const handleDateChange = (e) => {
    setDescription(e.target.value);
  };

    //  Sort the workouts based on their ID
  const sortedWorkouts = workouts.filter((workout)=> workout.eventId == workoutId ).slice().sort((a, b) => a.id - b.id);

  return (
    <div>
      <h1 className="profile rounded text-center add" style={{ marginBottom: '15px', marginTop: '15px', marginLeft: 'auto', marginRight: 'auto', width: '35%' }}>
        <b>{event.name} Workouts</b>
      </h1>
      {adding ? (
        <div className="addworkout">
          <h1><b>New Workout</b></h1>
          <div>
            <h1>
              <label htmlFor="text" style={{ marginRight: '10px' }}>
                Description:
              </label>
            </h1>
            <input type="text" id="description" style={{ marginTop: '40px', width: "75%" }} value={description} onChange={handleDateChange} />
          </div>
          <button className="btn btn-primary" style={{ marginRight: '10px', marginTop: '40px', marginBottom: "10px" }} onClick={handleSubmit} type="submit">
            Add Workout
          </button>
          <button className="btn btn-warning" style={{ marginTop: '40px', marginBottom: "10px" }} onClick={handleCancel} type="submit">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          {sortedWorkouts.length > 0 ? (
            <div className="text-center" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
              <table className="table table-bordered text-center add" style={{ backgroundColor: 'rgb(211, 211, 211)' }}>
                <thead>
                  <tr style={{ fontSize: "30px", backgroundColor: "rgb(150, 150, 150)" }}>
                    <th scope="col">Description</th>
                    <th scope="col">#</th>
                    {user.admin && <th scope="col">Actions</th>}
                    <th scope="col">Add</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedWorkouts.map((workout, index) => (
                    <tr key={workout.id} style={{ fontSize: '20px' }}>
                      <td>
                         {editingWorkoutId === workout.id ? (
                          <input
                            type="text"
                            value={editingDescription}
                            onChange={(e) => setEditingDescription(e.target.value)}
                            style={{ width: '100%' }}
                          />
                        ) : (
                          workout.description
                        )}
                      </td>
                      <td>{user.userworkouts ? user.userworkouts.filter((userWorkout) => userWorkout.workoutId === workout.id).length : 0}</td>
                      <td>
                    <button onClick={() => handleButtonClick(workout)}>+</button>
                   </td>
                      {user.admin && (
                        <td>
                          {editingWorkoutId === workout.id ? (
                            <>
                              <button className="btn btn-primary" onClick={handleSaveWorkout} style={{ marginRight: '5px' }}>
                                Save
                              </button>
                              <button className="btn btn-secondary" onClick={handleCancelEdit} style={{ marginRight: '5px' }}>
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="btn btn-warning btn-edit" onClick={() => handleEditWorkout(workout.id)} style={{ marginRight: '5px' }}>
                                Edit Workout
                              </button>
                              <button className="btn btn-danger btn-delete" onClick={() => handleDeleteWorkout(workout.id)}>
                                Delete Workout
                              </button>
                            </>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {!adding && (
                <button className="btn btn-primary" onClick={handleUpdate} style={{ marginLeft: 'auto', marginBottom: '15px', marginRight: 'auto' }}>
                  Add Workout
                </button>
              )}
            </div>
          ) : (
            <div className="text-center">
              <button className="btn btn-primary" onClick={handleUpdate} style={{ marginLeft: 'auto', marginBottom: '15px', marginRight: 'auto' }}>
                Add Workout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WorkoutDetail;
