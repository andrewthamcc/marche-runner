import {
  AUTH_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../../actions/user/types";
import { User } from "../../models/user";

class userState {
  _id: "";
  firstName: "";
  lastName: "";
  email: "";
  date: "";
}

const initialState = new userState();

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        _id: action.payload.user._id,
        firstName: action.payload.user.firstName,
        lastName: action.payload.user.lastName,
        email: action.payload.user.email,
        date: action.payload.user.date,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userReducer;
