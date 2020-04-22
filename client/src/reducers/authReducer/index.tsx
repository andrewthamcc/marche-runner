import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOAD_USER,
  LOAD_USER_FAILED,
  DELETE_USER,
  SET_AUTH_LOADING,
} from "../../actions/auth/types";

class authState {
  isAuthenticated = false;
  _id = "";
  firstName = "";
  loading = false;
}

const initialState = new authState();

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        loading: false,
        _id: action.payload.id,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOAD_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOAD_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        firstName: action.payload.firstName,
      };
    case LOGOUT:
    case DELETE_USER:
      localStorage.removeItem("token");

      return new authState();
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default authReducer;
