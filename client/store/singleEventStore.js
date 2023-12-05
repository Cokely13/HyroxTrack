import axios from "axios";

// Action Types
const SET_SINGLE_PROGRAM = "SET_SINGLE_PROGRAM";
const UPDATE_SINGLE_PROGRAM = "UPDATE_SINGLE_PROGRAM";
const TOKEN = "token";

// Action creators
export const _setSingleProgram= (programdata) => {
  return {
    type: SET_SINGLE_PROGRAM,
    programdata,
  };
};

const _updateSingleProgram = (programdata) => {
  return {
    type: UPDATE_SINGLE_PROGRAM,
    programdata,
  };
};

//Thunks
export const fetchProgram = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/programs/${id}`);
    dispatch(_setSingleProgram(data));
  };
};

export const updateSingleProgram = (program) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/programs/${program.id}`, program);
        const { data: programData } = await axios.get(`/api/programs/${program.id}`);
        dispatch(_updateSingleProgram(programData));
        // history.push(`/programs/${program.id}`)
      }
     catch (error) {
      console.log("PROGRAM", program)
    }
  };
};

// reducer
const initialState = [];
const singleProgramReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_PROGRAM:
      return action.programdata;
    case UPDATE_SINGLE_PROGRAM:
      return action.programdata;
    default:
      return state;
  }
};

export default singleProgramReducer;
