import store from "../../redux";
import axios from "axios";
import { AddItemData } from "../../models/item";

import {
  GET_ITEMS,
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  DELETE_PURCHASED,
  DELETE_ALL,
  SEARCH_ITEMS,
  CLEAR_SEARCH,
  SET_ITEMS_LOADING,
} from "./types";

const setLoading = () => {
  store.dispatch({
    type: SET_ITEMS_LOADING,
  });
};

export const getItems = () => async (dispatch) => {
  setLoading();

  try {
    const res = await axios.get("/shop");
    const data = res.data;

    dispatch({
      type: GET_ITEMS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addItem = (item: AddItemData) => async (dispatch) => {
  try {
    const res = await axios.post("/shop", item);
    const data = res.data;

    dispatch({
      type: ADD_ITEM,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editItem = (id: string, item) => async (dispatch) => {
  try {
    const res = await axios.patch(`/shop/${id}`, item);
    const data = res.data;

    dispatch({
      type: EDIT_ITEM,
      payload: { _id: id, ...data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = (id: string) => async (dispatch) => {
  try {
    const res = await axios.delete(`/shop/${id}`);
    const data = res.data;

    dispatch({
      type: DELETE_ITEM,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePurchasedItems = () => async (dispatch) => {
  setLoading();

  try {
    const res = await axios.delete("/shop/delete/purchased");
    const data = res.data;

    const ids = [];
    data.items.forEach((item) => ids.push(item._id));

    dispatch({
      type: DELETE_PURCHASED,
      payload: ids,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllItems = () => async (dispatch) => {
  setLoading();

  try {
    const res = await axios.delete("/shop/delete/all");
    const data = res.data;

    const ids = [];
    data.items.forEach((item) => ids.push(item._id));

    dispatch({
      type: DELETE_ALL,
      payload: ids,
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchItems = (searchText: string) => (dispatch) => {
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
