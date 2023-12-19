import axios from "axios";



// Action Types
const SET_SINGLE_CHALLENGE = "SET_SINGLE_CHALLENGE";
const UPDATE_SINGLE_CHALLENGE = "UPDATE_SINGLE_CHALLENGE";
const TOKEN = "token";

// Action creators
export const _setSingleChallenge= (challengedata) => {
  return {
    type: SET_SINGLE_CHALLENGE,
    challengedata,
  };
};

const _updateSingleChallenge = (challengedata) => {
  return {
    type: UPDATE_SINGLE_CHALLENGE,
    challengedata,
  };
};

//Thunks
export const fetchChallenge = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/challenges/${id}`);
    dispatch(_setSingleChallenge(data));
  };
};

export const updateSingleChallenge = (challenge) => {
  // console.log("IT MADE IT!")
  return async (dispatch) => {
    try {
        await axios.put(`/api/challenges/${challenge.id}`, challenge);
        const { data: challengeData } = await axios.get(`/api/challenges/${challenge.id}`);
        dispatch(_updateSingleChallenge(challengeData));
        // history.push("/challenges");
      }
     catch (error) {
      console.log("ERROR!!!", error)
    }
  };
};

// reducer
const initialState = [];
const singleChallengeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_CHALLENGE:
      return action.challengedata;
    case UPDATE_SINGLE_CHALLENGE:
      return action.challengedata;
    default:
      return state;
  }
};

export default singleChallengeReducer;
