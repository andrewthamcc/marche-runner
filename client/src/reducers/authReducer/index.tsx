import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOAD_USER,
  SET_LOADING,
} from "../../actions/auth/types";

class authState {
  isAuthenticated = true; // CHANGE THIS SHIT BACK
  _id = "0961235";
  firstName = "Andrew";
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
        isAuthenticated: true,
        _id: action.payload.id,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    case LOAD_USER:
      return {
        ...state,
        firstName: action.payload.user.firstName,
        loading: false,
      };
    case LOGOUT:
      localStorage.removeItem("token");

      // return new authState();
      return {
        ...state,
        isAuthenticated: false,
        setLoading: false,
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

export default authReducer;
