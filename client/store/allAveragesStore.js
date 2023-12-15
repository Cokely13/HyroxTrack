import Axios from "axios";
// import { useHistory } from 'react-router-dom'
// let history = useHistory();

const SET_AVERAGES ="SET_AVERAGES"
const CREATE_AVERAGE = "CREATE_AVERAGE"
const DELETE_AVERAGE = "DELETE_AVERAGE"


export const setAverages = (averages) =>{
  return{
    type: SET_AVERAGES,
    averages
  }
};

const _createAverage = (average) => {
  return {
    type: CREATE_AVERAGE,
    average,
  };
};

const _deleteAverage = (average) => {
  return {
    type: DELETE_AVERAGE,
    average,
  };
};

export const fetchAverages = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/averages");
        dispatch(setAverages(data));
  };
};

export const createAverage = (average, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/averages", average);
    dispatch(_createAverage(created));
  };
};

export const deleteAverage = (id, history) => {
  return async (dispatch) => {
    const { data: average } = await Axios.delete(`/api/averages/${id}`);
    dispatch(_deleteAverage(average));
  };
};


const initialState = [];
export default function averagesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AVERAGES:
      return action.averages;
      case CREATE_AVERAGE:
        return [...state, action.average];
        case DELETE_AVERAGE:
      return state.filter((average) => average.id !== action.average.id)
      ;
      default:
        return state;
    }
  }
