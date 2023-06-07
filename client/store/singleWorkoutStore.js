import axios from "axios";

// Action Types
const SET_SINGLE_WORKOUT = "SET_SINGLE_WORKOUT";
const UPDATE_SINGLE_WORKOUT = "UPDATE_SINGLE_WORKOUT";
const TOKEN = "token";

// Action creators
export const _setSingleWorkout= (workoutdata) => {
  return {
    type: SET_SINGLE_WORKOUT,
    workoutdata,
  };
};

const _updateSingleWorkout = (workoutdata) => {
  return {
    type: UPDATE_SINGLE_WORKOUT,
    workoutdata,
  };
};

//Thunks
export const fetchWorkout = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/workouts/${id}`);
    dispatch(_setSingleWorkout(data));
  };
};

export const updateSingleWorkout = (workout) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/workouts/${workout.id}`, workout);
        const { data: workoutData } = await axios.get(`/api/workouts/${workout.id}`);
        dispatch(_updateSingleWorkout(workoutData));
        // history.push(`/workouts/${workout.id}`)
      }
     catch (error) {
      console.log("WORKOUT", workout)
    }
  };
};

// reducer
const initialState = [];
const singleWorkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_WORKOUT:
      return action.workoutdata;
    case UPDATE_SINGLE_WORKOUT:
      return action.workoutdata;
    default:
      return state;
  }
};

export default singleWorkoutReducer;
