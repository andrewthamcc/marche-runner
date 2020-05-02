import store from "../../redux";
import axios from "axios";
import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import {
  ADD_MEAL,
  DELETE_MEAL,
  GET_MEALS,
  SET_DATE_RANGE,
  SET_DATES,
  SET_MEAL_LOADING,
} from "./types";
import { dateRange } from "../../reducers/mealReducer";

const setLoading = () => {
  store.dispatch({
    type: SET_MEAL_LOADING,
  });
};

export const addMeal = (meal) => async (dispatch) => {
  try {
    const res = await axios.post("/meals", meal);
    const data = res.data;

    dispatch({
      type: ADD_MEAL,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMeals = (startDate: string, endDate: string) => async (
  dispatch
) => {
  setLoading();

  const params = {
    start_date: startDate,
    end_date: endDate,
  };

  try {
    const res = await axios.get("/meals", { params });
    const data = res.data;

    dispatch({
      type: GET_MEALS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMeal = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/meals${id}`);
    const data = res.data;

    dispatch({
      type: DELETE_MEAL,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setDates = (startDate: string, endDate: string) => (dispatch) => {
  const newDates = {
    startDate,
    endDate,
  };

  dispatch({
    type: SET_DATES,
    payload: newDates,
  });
};

export const setDateRange = (range: dateRange) => (dispatch) => {
  let startDate: string = "";
  let endDate: string = "";

  if (range === dateRange.week) {
    startDate = format(startOfWeek(new Date()), "yyyy-MM-dd");
    endDate = format(endOfWeek(new Date()), "yyyy-MM-dd");
  } else if (range === dateRange.month) {
    startDate = format(startOfMonth(new Date()), "yyyy-MM-dd");
    endDate = format(endOfMonth(new Date()), "yyyy-MM-dd");
  }

  const dateData = {
    range,
    startDate,
    endDate,
  };

  dispatch({
    type: SET_DATE_RANGE,
    payload: dateData,
  });
};
