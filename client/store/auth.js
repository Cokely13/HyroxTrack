import axios from 'axios'
import history from '../history'

export const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

// export const authenticate = (userName, password, email, method) => async dispatch => {
//   try {
//     const res = await axios.post(`/auth/${method}`, {userName, password, email})
//     window.localStorage.setItem(TOKEN, res.data.token)
//     dispatch(me())
//   } catch (authError) {
//     return dispatch(setAuth({error: authError}))
//   }
// }

export const authenticate = (userName, password, email, method) => async dispatch => {
  try {
    let res;
    if (method === 'signup') {
      // Include email for signup
      res = await axios.post(`/auth/${method}`, {userName, password, email});
    } else {
      // Exclude email for login
      res = await axios.post(`/auth/${method}`, {userName, password});
    }
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({error: authError}));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
