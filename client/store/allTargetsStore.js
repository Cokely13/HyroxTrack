import Axios from "axios";
// import { useHistory } from 'react-router-dom'
// let history = useHistory();

const SET_TARGETS ="SET_TARGETS"
const CREATE_TARGET = "CREATE_TARGET"
const DELETE_TARGET = "DELETE_TARGET"


export const setTargets = (targets) =>{
  return{
    type: SET_TARGETS,
    targets
  }
};

const _createTarget = (target) => {
  return {
    type: CREATE_TARGET,
    target,
  };
};

const _deleteTarget = (target) => {
  return {
    type: DELETE_TARGET,
    target,
  };
};

export const fetchTargets = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/targets");
        dispatch(setTargets(data));
  };
};

export const createTarget = (target, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/targets", target);
    dispatch(_createTarget(created));
  };
};

export const deleteTarget = (id, history) => {
  return async (dispatch) => {
    const { data: target } = await Axios.delete(`/api/targets/${id}`);
    dispatch(_deleteTarget(target));
  };
};


const initialState = [];
export default function targetsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TARGETS:
      return action.targets;
      case CREATE_TARGET:
        return [...state, action.target];
        case DELETE_TARGET:
      return state.filter((target) => target.id !== action.target.id)
      ;
      default:
        return state;
    }
  }
