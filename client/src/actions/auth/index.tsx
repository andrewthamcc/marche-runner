import axios from "axios";
import { useHistory } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import store from "../../redux";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOAD_USER,
  SET_LOADING,
} from "./types";

const setLoading = () => {
  store.dispatch({
    type: SET_LOADING,
  });
};

const loadUser = async () => {
  setLoading();

  // sets jwt into axios headers
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    // const res = await axios.get("/profile")
    // const userData = res.data
    console.log("My Token", localStorage.token);
    const userData = {
      user: {
        _id: "something",
        firstName: "Andrew",
        // lastName: "T",
        // email: "andrew@andrew.com",
        // date: "2020-04-01",
      },
    };

    store.dispatch({
      type: LOAD_USER,
      payload: userData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = (data) => async (dispatch) => {
  setLoading();

  try {
    // const res = await axios.post("/profile", data);
    // const userData = res.data;
    const userData = {
      id: "09876",
      token: "token",
    };

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

export const loginUser = (data) => async (dispatch) => {
  setLoading();

  try {
    // const res = await axios.post("/login", data);
    // const userData = res.data;
    const userData = {
      id: "09876",
      token: "token",
    };

    dispatch({
      type: LOGIN_SUCCESS,
      payload: userData,
    });

    loadUser();
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
