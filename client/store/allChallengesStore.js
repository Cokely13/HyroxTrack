import Axios from "axios";
// import { useHistory } from 'react-router-dom'
// let history = useHistory();

const SET_CHALLENGES ="SET_CHALLENGES"
const CREATE_CHALLENGE = "CREATE_CHALLENGE"
const DELETE_CHALLENGE = "DELETE_CHALLENGE"


export const setChallenges = (challenges) =>{
  return{
    type: SET_CHALLENGES,
    challenges
  }
};

const _createChallenge = (challenge) => {
  return {
    type: CREATE_CHALLENGE,
    challenge,
  };
};

const _deleteChallenge = (challenge) => {
  return {
    type: DELETE_CHALLENGE,
    challenge,
  };
};

export const fetchChallenges = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/challenges");
        dispatch(setChallenges(data));
  };
};

export const createChallenge = (challenge, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/challenges", challenge);
    dispatch(_createChallenge(created));
  };
};

export const deleteChallenge = (id, history) => {
  return async (dispatch) => {
    const { data: challenge } = await Axios.delete(`/api/challenges/${id}`);
    dispatch(_deleteChallenge(challenge));
  };
};


const initialState = [];
export default function challengesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHALLENGES:
      return action.challenges;
      case CREATE_CHALLENGE:
        return [...state, action.challenge];
        case DELETE_CHALLENGE:
      return state.filter((challenge) => challenge.id !== action.challenge.id)
      ;
      default:
        return state;
    }
  }
