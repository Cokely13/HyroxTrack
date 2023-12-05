import Axios from "axios";

const SET_PROGRAMS ="SET_PROGRAMS"
const CREATE_PROGRAM = "CREATE_PROGRAM"
const DELETE_PROGRAM = "DELETE_PROGRAM"


export const setPrograms = (programs) =>{
  return{
    type: SET_PROGRAMS,
    programs
  }
};

const _createProgram = (program) => {
  return {
    type: CREATE_PROGRAM,
    program,
  };
};

const _deleteProgram = (program) => {
  return {
    type: DELETE_PROGRAM,
    program
  };
};

export const fetchPrograms = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/programs");
        dispatch(setPrograms(data));
  };
};

export const createProgram = (program, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/programs", program);
    dispatch(_createProgram(created));
    history.push("/programs");
  };
};

export const deleteProgram = (id, history) => {
  return async (dispatch) => {
    const { data: program } = await Axios.delete(`/api/programs/${id}`);
    dispatch(_deleteProgram(program));
    history.push("/programs");
  };
};


const initialState = [];
export default function programsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROGRAMS:
      return action.programs;
      case CREATE_PROGRAM:
        return [...state, action.program];
        case DELETE_PROGRAM:
      return state.filter((program) => program.id !== action.program.id)
      ;
      default:
        return state;
    }
  }
