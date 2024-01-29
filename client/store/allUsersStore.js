import Axios from "axios";

const SET_USERS ="SET_USERS"
const DELETE_USER = "DELETE_USER"

export const setUsers = (users) =>{
  return{
    type: SET_USERS,
    users
  }
};

const _deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/users");
        dispatch(setUsers(data));
  };
};

export const deleteUser = (id, history) => {
  return async (dispatch) => {
    const { data: user } = await Axios.delete(`/api/users/${id}`);
    dispatch(_deleteUser(user));
  };
};



const initialState = [];
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
      case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id)
      ;
      default:
        return state;
    }
  }
