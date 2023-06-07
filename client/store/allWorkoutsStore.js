import Axios from "axios";

const SET_WORKOUTS ="SET_WORKOUTS"
const CREATE_WORKOUT = "CREATE_WORKOUT"
const DELETE_WORKOUT = "DELETE_WORKOUT"


export const setWorkouts = (workouts) =>{
  return{
    type: SET_WORKOUTS,
    workouts
  }
};

const _createWorkout = (workout) => {
  return {
    type: CREATE_WORKOUT,
    workout,
  };
};

const _deleteWorkout = (workout) => {
  return {
    type: DELETE_WORKOUT,
    workout
  };
};

export const fetchWorkouts = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/workouts");
        dispatch(setWorkouts(data));
  };
};

export const createWorkout = (workout, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/workouts", workout);
    dispatch(_createWorkout(created));
    history.push("/workouts");
  };
};

export const deleteWorkout = (id, history) => {
  return async (dispatch) => {
    const { data: workout } = await Axios.delete(`/api/workouts/${id}`);
    dispatch(_deleteWorkout(workout));
    history.push("/workouts");
  };
};


const initialState = [];
export default function workoutsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WORKOUTS:
      return action.workouts;
      case CREATE_WORKOUT:
        return [...state, action.workout];
        case DELETE_WORKOUT:
      return state.filter((workout) => workout.id !== action.workout.id)
      ;
      default:
        return state;
    }
  }
