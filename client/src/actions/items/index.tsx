import axios from "axios";

import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM } from "./types";

export const addItem = (item) => (dispatch) => {
  dispatch({
    type: ADD_ITEM,
  });
};

export const editItem = (item) => (dispatch) => {
  dispatch({
    type: EDIT_ITEM,
  });
};

export const deleteItem = (item) => (dispatch) => {
  dispatch({
    type: DELETE_ITEM,
  });
};
