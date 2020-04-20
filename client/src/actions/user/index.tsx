import store from "../../redux";
import axios from "axios";
import {
  GET_PROFILE,
  EDIT_PROFILE,
  DELETE_PROFILE,
  SET_LOADING,
} from "./types";

const setLoading = () => {
  store.dispatch({
    type: SET_LOADING,
  });
};

export const getUserProfile = () => async (dispatch) => {
  setLoading();

  try {
    // const res = await axios.get("/profile")
    // const userData = res.data

    const userData = {
      user: {
        _id: "something",
        firstName: "Andrew",
        lastName: "T",
        email: "andrew@andrew.com",
        date: "2020-04-01",
      },
    };

    dispatch({
      type: GET_PROFILE,
      payload: userData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editUserProfile = (data) => async (dispatch) => {
  try {
    // const res = await axios.post("/profile", data)
    // const userData = res.data

    const userData = {
      firstName: "Denise",
      lastName: "S",
      email: "denise@denise.com",
    };

    dispatch({
      type: EDIT_PROFILE,
      payload: userData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserProfile = () => async (dispatch) => {
  try {
    // const res = await axios.delete("/profile")
    // const userData = res.data

    dispatch({
      type: DELETE_PROFILE,
    });
  } catch (error) {
    console.log(error);
  }
};
