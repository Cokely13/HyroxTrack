import Axios from "axios";

const SET_USERWORKOUTS ="SET_USERWORKOUTS"
const CREATE_USERWORKOUT = "CREATE_USERWORKOUT"
const DELETE_USERWORKOUT = "DELETE_USERWORKOUT"


export const setUserWorkouts = (userworkouts) =>{
  return{
    type: SET_USERWORKOUTS,
    userworkouts
  }
};

const _createUserWorkout = (userworkout) => {
  return {
    type: CREATE_USERWORKOUT,
    userworkout,
  };
};

const _deleteUserWorkout = (userworkout) => {
  return {
    type: DELETE_USERWORKOUT,
    userworkout
  };
};

export const fetchUserWorkouts = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/userworkouts");
        dispatch(setUserWorkouts(data));
  };
};

export const createUserWorkout = (userworkout, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/userworkouts", userworkout);
    dispatch(_createUserWorkout(created));
    // history.push("/userworkouts");
  };
};

export const deleteUserWorkout = (id, history) => {
  return async (dispatch) => {
    const { data: userworkout } = await Axios.delete(`/api/userworkouts/${id}`);
    dispatch(_deleteUserWorkout(userworkout));
    // history.push("/userworkouts");
  };
};


const initialState = [];
export default function userworkoutsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERWORKOUTS:
      return action.userworkouts;
      case CREATE_USERWORKOUT:
        return [...state, action.userworkout];
        case DELETE_USERWORKOUT:
      return state.filter((userworkout) => userworkout.id !== action.userworkout.id)
      ;
      default:
        return state;
    }
  }
