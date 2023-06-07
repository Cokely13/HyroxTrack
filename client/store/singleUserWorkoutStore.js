import axios from "axios";

// Action Types
const SET_SINGLE_USERWORKOUT = "SET_SINGLE_USERWORKOUT";
const UPDATE_SINGLE_USERWORKOUT = "UPDATE_SINGLE_USERWORKOUT";
const TOKEN = "token";

// Action creators
export const _setSingleUserWorkout= (userworkoutdata) => {
  return {
    type: SET_SINGLE_USERWORKOUT,
    userworkoutdata,
  };
};

const _updateSingleUserWorkout = (userworkoutdata) => {
  return {
    type: UPDATE_SINGLE_USERWORKOUT,
    userworkoutdata,
  };
};

//Thunks
export const fetchUserWorkout = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/userworkouts/${id}`);
    dispatch(_setSingleUserWorkout(data));
  };
};

export const updateSingleUserWorkout = (userworkout) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/userworkouts/${userworkout.id}`, userworkout);
        const { data: userworkoutData } = await axios.get(`/api/userworkouts/${userworkout.id}`);
        dispatch(_updateSingleUserWorkout(userworkoutData));
        // history.push(`/userworkouts/${userworkout.id}`)
      }
     catch (error) {
      console.log("USERWORKOUT", userworkout)
    }
  };
};

// reducer
const initialState = [];
const singleUserWorkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_USERWORKOUT:
      return action.userworkoutdata;
    case UPDATE_SINGLE_USERWORKOUT:
      return action.userworkoutdata;
    default:
      return state;
  }
};

export default singleUserWorkoutReducer;
