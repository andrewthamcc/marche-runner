import {
  GET_PROFILE,
  EDIT_PROFILE,
  DELETE_PROFILE,
  SET_LOADING,
} from "../../actions/user/types";

class UserState {
  firstName = "";
  lastName = "";
  email = "";
  date = "";
  error = "";
  loading = false;
}

const initialState = new UserState();

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        firstName: action.payload.user.firstName,
        lastName: action.payload.user.lastName,
        email: action.payload.user.email,
        date: action.payload.user.date,
        loading: false,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        loading: false,
      };
    case DELETE_PROFILE:
      return {
        ...state,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default userReducer;
