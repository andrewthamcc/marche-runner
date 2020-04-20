import store from "../../redux";
import axios from "axios";

import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM } from "./types";

export const addItem = (item) => async (dispatch) => {
  // const res = await axios.post("/shop", item)
  // const data = res.data;

  dispatch({
    type: ADD_ITEM,
  });
};

export const editItem = (id) => async (dispatch) => {
  // const res = await axios.patch(`/shop/${id}`)

  dispatch({
    type: EDIT_ITEM,
  });
};

export const deleteItem = (id) => async (dispatch) => {
  // const res = await axios.delete(`/shop/${id}`)
  // const data = res.data

  dispatch({
    type: DELETE_ITEM,
  });
};
