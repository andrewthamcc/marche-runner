import store from "../../redux";
import { Dispatch } from "../index";
import axios from "axios";
import { AddItemData } from "../../models/item";
import { Item } from "../../models/item";
import {
  ADD_ITEM,
  CLEAR_ITEM_ERROR,
  CLEAR_SEARCH,
  DELETE_ALL,
  DELETE_ITEM,
  DELETE_PURCHASED,
  EDIT_ITEM,
  GET_ITEMS,
  SEARCH_ITEMS,
  SET_ITEM_ERROR,
  SET_ITEMS_LOADING,
} from "./types";

const setLoading = () => {
  store.dispatch({
    type: SET_ITEMS_LOADING,
  });
};

export const clearError = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_ITEM_ERROR,
  });
};

export const getItems = () => async (dispatch: Dispatch) => {
  setLoading();

  try {
    const res = await axios.get("/shop");
    const data = res.data;

    // alpha sort list items after fetch
    const sorted = data
      .sort((a: Item, b: Item) =>
        a.name[0].toLowerCase() < b.name[0].toLowerCase() ? -1 : 1
      )
      .reverse();

    dispatch({
      type: GET_ITEMS,
      payload: sorted,
    });
  } catch (error) {
    dispatch({
      type: SET_ITEM_ERROR,
      payload: error,
    });
  }
};

export const addItem = (item: AddItemData) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post("/shop", item);
    const data = res.data;

    dispatch({
      type: ADD_ITEM,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_ITEM_ERROR,
      payload: error,
    });
  }
};

export const editItem = (id: string, item) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.patch(`/shop/${id}`, item);
    const data = res.data;

    dispatch({
      type: EDIT_ITEM,
      payload: { _id: id, ...data },
    });
  } catch (error) {
    dispatch({
      type: SET_ITEM_ERROR,
      payload: error,
    });
  }
};

export const deleteItem = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.delete(`/shop/${id}`);
    const data = res.data;

    dispatch({
      type: DELETE_ITEM,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_ITEM_ERROR,
      payload: error,
    });
  }
};

export const deletePurchasedItems = () => async (dispatch: Dispatch) => {
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
    dispatch({
      type: SET_ITEM_ERROR,
      payload: error,
    });
  }
};

export const deleteAllItems = () => async (dispatch: Dispatch) => {
  setLoading();

  try {
    const res = await axios.delete("/shop/delete/all");
    const data = res.data;

    const ids = [];
    data.items.forEach((item: Item) => ids.push(item._id));

    dispatch({
      type: DELETE_ALL,
      payload: ids,
    });
  } catch (error) {
    dispatch({
      type: SET_ITEM_ERROR,
      payload: error,
    });
  }
};

export const searchItems = (searchText: string) => (dispatch: Dispatch) => {
  dispatch({
    type: SEARCH_ITEMS,
    payload: searchText,
  });
};

export const clearSearch = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_SEARCH,
  });
};
