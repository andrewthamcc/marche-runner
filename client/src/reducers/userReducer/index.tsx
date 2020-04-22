import {
  GET_PROFILE,
  EDIT_PROFILE,
  SET_USER_LOADING,
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
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        date: action.payload.date,
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
    case SET_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default userReducer;
