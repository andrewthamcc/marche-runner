import store from "../../redux";
import axios from "axios";
import { dummyData } from "./dummy";

import {
  GET_ITEMS,
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  SEARCH_ITEMS,
  SET_LOADING,
  CLEAR_SEARCH,
} from "./types";

const setLoading = () => {
  store.dispatch({
    type: SET_LOADING,
  });
};

export const getItems = () => async (dispatch) => {
  setLoading();
  try {
    // const res = await axios.get("/shop")
    // const data = res.data

    const data = dummyData;

    dispatch({
      type: GET_ITEMS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addItem = (item) => async (dispatch) => {
  // const res = await axios.post("/shop", item)
  // const data = res.data;

  const data = {
    ...item,
    _id: Math.random().toString(),
    _v: 0,
    purchased: false,
  };

  dispatch({
    type: ADD_ITEM,
    payload: data,
  });
};

export const editItem = (id, data) => async (dispatch) => {
  // const res = await axios.patch(`/shop/${id}`, data)
  // const data = res.data;

  dispatch({
    type: EDIT_ITEM,
    payload: { _id: id, ...data },
  });
};

export const deleteItem = (id) => async (dispatch) => {
  // const res = await axios.delete(`/shop/${id}`)
  // const data = res.data

  const data = {
    _id: id,
  };

  dispatch({
    type: DELETE_ITEM,
    payload: data,
  });
};

export const searchItems = (searchText) => (dispatch) => {
  dispatch({
    type: SEARCH_ITEMS,
    payload: searchText,
  });
};

export const clearSearch = () => (dispatch) => {
  dispatch({
    type: CLEAR_SEARCH,
  });
};
