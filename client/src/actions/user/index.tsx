import axios from "axios";
import {
  AUTH_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

export const registerUser = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/profile", data);
    const userData = res.data;

    dispatch({
      type: REGISTER_SUCCESS,
      payload: userData,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error,
    });
  }
};

export const loginUser = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/login", data);
    const userData = res.data;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: userData,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
