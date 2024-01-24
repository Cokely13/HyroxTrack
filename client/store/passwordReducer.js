import axios from "axios";
import { TOKEN } from './auth'

// Action Types
export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';


// Action creators
export const changePasswordRequest = () => {
  return { type: CHANGE_PASSWORD_REQUEST };
};

export const changePasswordSuccess = (message) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: message
  };
};

export const changePasswordFailure = (error) => {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    payload: error
  };
};


//Thunks
// export const changePassword = (userId, currentPassword, newPassword) => async (dispatch) => {
//   try {
//     dispatch(changePasswordRequest());

//     const response = await fetch(`/api/users/${userId}/change-password`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ currentPassword, newPassword }),
//     });

//     if (response.ok) {
//       const result = await response.json();
//       dispatch(changePasswordSuccess(result.message)); // You may want to adjust based on your API response
//     } else {
//       dispatch(changePasswordFailure('Failed to change password.'));
//     }
//   } catch (error) {
//     console.error('Error changing password:', error);
//     dispatch(changePasswordFailure('Error changing password.'));
//   }
// };
export const changePassword = (userId, currentPassword, newPassword) => async (dispatch) => {
  try {
    dispatch(changePasswordRequest());

    const token = window.localStorage.getItem(TOKEN);; // Get the token from local storage

    console.log('Token:', token);

    // const response = await fetch(`/api/users/${userId}/change-password`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}` // Include the token in the Authorization header
    //   },
    //   body: JSON.stringify({ currentPassword, newPassword }),
    // });

    const response = await axios.put(`/api/users/${userId}/change-password`, { currentPassword, newPassword }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const result = await response.json();
      dispatch(changePasswordSuccess(result.message)); // You may want to adjust based on your API response
    } else {
      const errorText = await response.text();
      dispatch(changePasswordFailure(errorText));
    }
  } catch (error) {
    console.error('Error changing password:', error);
    dispatch(changePasswordFailure('Error changing password.'));
  }
};

// reducer
const initialState = {
  loading: false,
  message: '',
  error: '',
};

const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: '',
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        message: '',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default passwordReducer;

