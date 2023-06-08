import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { fetchWorkouts } from '../store/allWorkoutsStore';
import { fetchSingleUser } from '../store/singleUserStore';
import { createUserWorkout } from '../store/allUserWorkoutsStore';
import { createWorkout } from '../store/allWorkoutsStore';
import { fetchEvent } from '../store/singleEventStore';

function Workouts() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const workouts = useSelector((state) => state.allWorkouts);
  const user = useSelector((state) => state.singleUser);
  const event = useSelector((state) => state.singleEvent);
  const [reload, setReload] = useState(false);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const {  workoutId } = useParams();
  const [adding, setAdding] = useState();

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

  const handleUpdate = (e) => {
    e.preventDefault();
    setAdding(true);
  };

  // Sort the workouts based on their ID
  const sortedWorkouts = workouts.filter((workout)=> workout.eventId == workoutId ).slice().sort((a, b) => a.id - b.id);

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!description) {
    //   setErrorMessage('Please Enter Description');
    //   return;
    // }

    // if (!minutes && !seconds) {
    //   setErrorMessage('Please Select Duration');
    //   return;
    // }



    // Create a new result object with the input values
    const newWorkout = {
      name: event.name,
      description: description,
      eventId: event.id
    };

    dispatch(createWorkout(newWorkout));

    // Set the success message and clear the input fields
    // setSuccessMessage('Workout Added Successfully!');
    setDescription('');
    setAdding(false)
    // setErrorMessage('');
  };

  const handleCancel =(e) => {
    setAdding(false)
  }

  const handleDateChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div>
      <h1 className="profile border rounded border-5  text-center " style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}>
        {event.name} Workouts
      </h1>
      {adding == true ? <div className='text-center'><h1>New Workout</h1>
       <div>
       <h1><label htmlFor="text" style={{ marginRight: "10px" }}>Description:  </label></h1>
       <input type="text" id="description" style={{marginTop: "40px" }} value={description} onChange={handleDateChange} />
     </div>
     <button className="btn btn-primary" style={{ marginRight: "10px", marginTop: "40px" }} onClick={handleSubmit} type="submit">Add Result</button>
     <button className="btn btn-warning" style={{  marginTop: "40px" }} onClick={handleCancel}  type="submit">Cancel</button> </div>:
      <div>
      {sortedWorkouts.length > 0 ? (
        <div className='text-center' style={{ paddingLeft: '15px', paddingRight: '15px' }}>
          <table className="table table-bordered text-center" style= {{backgroundColor:"rgb(211, 211, 211)"}}>
            <thead>
              <tr style= {{fontSize:"30px"}}>
                <th scope="col">Description</th>
                <th scope="col">#</th>
                <th scope="col">Workout Done</th>
              </tr>
            </thead>
            <tbody>
              {sortedWorkouts.map((workout) => (
                <tr key={workout.id} style= {{fontSize:"20px"}}>
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
          <button
              className="btn btn-primary"
              onClick={handleUpdate}
              style={{  marginLeft: 'auto', marginBottom: '15px', marginRight: 'auto' }}
            >
              Add Workout
            </button>
        </div>
      ) : (
        <div className='text-center'>
        <button
              className="btn btn-primary"
              onClick={handleUpdate}
              style={{ marginLeft: 'auto', marginBottom: '15px', marginRight: 'auto' }}
            >
              Add Workout
            </button>
            </div>
      )}
      </div>}
    </div>
  );
}

export default Workouts;

