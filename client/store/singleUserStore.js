import axios from "axios";

// Action Types
const SET_SINGLE_USER = "SET_SINGLE_USER";
const UPDATE_SINGLE_USER = "UPDATE_SINGLE_USER";
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';


// Action creators
export const _setSingleUser= (userdata) => {
  return {
    type: SET_SINGLE_USER,
    userdata,
  };
};

const _changePassword = (passwordData) =>{
  return{
   type: CHANGE_PASSWORD,
   passwordData,
  }
  };

const _updateSingleUser = (userdata) => {
  return {
    type: UPDATE_SINGLE_USER,
    userdata,
  };
};

//Thunks
export const fetchSingleUser = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/users/${id}`);
    dispatch(_setSingleUser(data));
  };
};

export const updateSingleUser = (user) => {
  return async (dispatch) => {
    try {

        await axios.put(`/api/users/${user.id}`, user);
        const { data: userData } = await axios.get(`/api/users/${user.id}`);

        dispatch(_updateSingleUser(userData));
      }
     catch (error) {
      console.log("LAAA", error)
    }
  };
};

export const changePassword = (userId, currentPassword, newPassword) => {
  return async (dispatch) => {
    try {
      // Add your API endpoint for changing password
      const response = await fetch(`/api/users/${userId}/change-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        const passwordData = await response.json();
        dispatch(_changePassword(passwordData));
      } else {
        // Handle errors, e.g. display a message to the user
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };
};

// reducer
const initialState = [];
const singleUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_USER:
      return action.userdata;
    case UPDATE_SINGLE_USER:
      return action.userdata;
        case CHANGE_PASSWORD:
          return action.userdata;
    default:
      return state;
  }
};

export default singleUserReducer;
