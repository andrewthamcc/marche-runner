import store from "../../redux";
import axios from "axios";
import { GET_PROFILE, EDIT_PROFILE, SET_USER_LOADING } from "./types";

const setLoading = () => {
  store.dispatch({
    type: SET_USER_LOADING,
  });
};

export const getUserProfile = () => async (dispatch) => {
  setLoading();

  try {
    const res = await axios.get("/profile");
    const userData = res.data;

    dispatch({
      type: GET_PROFILE,
      payload: userData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editUserProfile = (data) => async (dispatch) => {
  setLoading();

  try {
    const res = await axios.patch("/profile", data);
    const userData = res.data;

    dispatch({
      type: EDIT_PROFILE,
      payload: userData,
    });
  } catch (error) {
    console.log(error);
  }
};
