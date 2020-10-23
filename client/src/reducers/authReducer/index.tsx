import { IAction } from "../../actions";
import {
  DELETE_USER,
  CLEAR_AUTH_ERROR,
  LOAD_USER,
  LOAD_USER_FAILED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_AUTH_LOADING,
} from "../../actions/auth/types";

class authState {
  isAuthenticated: boolean = false;
  _id: string = "";
  firstName: string = "";
  loading: boolean = false;
  error: any = null;
}

const initialState = new authState();

const authReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("authenticated", action.payload.token);

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
        firstName: action.payload.firstName as string,
      };
    case LOGOUT:
    case DELETE_USER:
      localStorage.removeItem("token");
      sessionStorage.removeItem("authenticated");

      return new authState();
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null,
      };
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
