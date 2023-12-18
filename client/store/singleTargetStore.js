import axios from "axios";



// Action Types
const SET_SINGLE_TARGET = "SET_SINGLE_TARGET";
const UPDATE_SINGLE_TARGET = "UPDATE_SINGLE_TARGET";
const TOKEN = "token";

// Action creators
export const _setSingleTarget= (targetdata) => {
  return {
    type: SET_SINGLE_TARGET,
    targetdata,
  };
};

const _updateSingleTarget = (targetdata) => {
  return {
    type: UPDATE_SINGLE_TARGET,
    targetdata,
  };
};

//Thunks
export const fetchTarget = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/targets/${id}`);
    dispatch(_setSingleTarget(data));
  };
};

export const updateSingleTarget = (target) => {
  // console.log("IT MADE IT!")
  return async (dispatch) => {
    try {
        await axios.put(`/api/targets/${target.id}`, target);
        const { data: targetData } = await axios.get(`/api/targets/${target.id}`);
        dispatch(_updateSingleTarget(targetData));
        // history.push("/targets");
      }
     catch (error) {
      console.log("ERROR!!!", error)
    }
  };
};

// reducer
const initialState = [];
const singleTargetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_TARGET:
      return action.targetdata;
    case UPDATE_SINGLE_TARGET:
      return action.targetdata;
    default:
      return state;
  }
};

export default singleTargetReducer;
