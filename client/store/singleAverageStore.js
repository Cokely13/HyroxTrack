import axios from "axios";



// Action Types
const SET_SINGLE_AVERAGE = "SET_SINGLE_AVERAGE";
const UPDATE_SINGLE_AVERAGE = "UPDATE_SINGLE_AVERAGE";
const TOKEN = "token";

// Action creators
export const _setSingleAverage= (averagedata) => {
  return {
    type: SET_SINGLE_AVERAGE,
    averagedata,
  };
};

const _updateSingleAverage = (averagedata) => {
  return {
    type: UPDATE_SINGLE_AVERAGE,
    averagedata,
  };
};

//Thunks
export const fetchAverage = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/averages/${id}`);
    dispatch(_setSingleAverage(data));
  };
};

export const updateSingleAverage = (average) => {
  // console.log("IT MADE IT!")
  return async (dispatch) => {
    try {
        await axios.put(`/api/averages/${average.id}`, average);
        const { data: averageData } = await axios.get(`/api/averages/${average.id}`);
        dispatch(_updateSingleAverage(averageData));
        // history.push("/averages");
      }
     catch (error) {
      console.log("ERROR!!!", error)
    }
  };
};

// reducer
const initialState = [];
const singleAverageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_AVERAGE:
      return action.averagedata;
    case UPDATE_SINGLE_AVERAGE:
      return action.averagedata;
    default:
      return state;
  }
};

export default singleAverageReducer;
