import axios from "axios";
import store from "../../redux";
import { Dispatch } from "../index";
import setAuthToken from "../../utils/setAuthToken";
import {
  CLEAR_AUTH_ERROR,
  DELETE_USER,
  LOAD_USER,
  LOAD_USER_FAILED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_AUTH_LOADING,
} from "./types";

import { LoginFormData, RegisterFormData } from "../../models/user";

const setLoading = () => {
  store.dispatch({
    type: SET_AUTH_LOADING,
  });
};

export const clearErrors = () => {
  store.dispatch({
    type: CLEAR_AUTH_ERROR,
  });
};

const loadUser = async () => {
  setLoading();

  // sets jwt into axios headers
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else if (sessionStorage.authenticated) {
    setAuthToken(sessionStorage.authenticated);
  }

  try {
    const res = await axios.get("/profile");
    const userData = res.data;

    store.dispatch({
      type: LOAD_USER,
      payload: userData,
    });
  } catch (error) {
    store.dispatch({
      type: LOAD_USER_FAILED,
      payload: error,
    });
  }
};

export const registerUser = (data: RegisterFormData) => async (
  dispatch: Dispatch
) => {
  setLoading();
  dispatch({ type: CLEAR_AUTH_ERROR });

  try {
    const res = await axios.post("/profile", data);
    const userData = res.data;

    dispatch({
      type: REGISTER_SUCCESS,
      payload: userData,
    });

    loadUser();
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error,
    });
  }
};

export const loginUser = (data: LoginFormData) => async (
  dispatch: Dispatch
) => {
  setLoading();

  dispatch({ type: CLEAR_AUTH_ERROR });

  try {
    const res = await axios.post("/login", data);
    const userData = res.data;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: userData,
    });

    loadUser();
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response,
    });
  }
};

export const logoutUser = () => (dispatch: Dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const deleteUserProfile = () => async (dispatch: Dispatch) => {
  setLoading();

  try {
    // const res = await axios.delete("/profile");
    // const userData = res.data;
    await axios.delete("/profile");

    dispatch({
      type: DELETE_USER,
      // payload: userData,
    });
  } catch (error) {
    console.log(error);
  }
};
