import moment from "moment";
import {
  ADD_MEAL,
  DELETE_MEAL,
  GET_MEALS,
  SET_DATE_RANGE,
  SET_MEAL_LOADING,
} from "../../actions/meals/types";
import { Meal } from "../../models/meal";

export enum dateRange {
  week = "week",
  month = "month",
}

class MenuState {
  currentDay: string = moment().format("YYYY-MM-DD");
  startDate: string = moment().startOf("week").format("YYYY-MM-DD");
  endDate: string = moment().endOf("week").format("YYYY-MM-DD");
  dateRange: dateRange = dateRange.week;
  meals: Meal[] = [];
  loading: boolean = false;
  error: any = null;
}

const initialState = new MenuState();

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEAL:
      return {
        ...state,
        meals: [...state.meals, action.payload],
      };
    case GET_MEALS:
      return {
        state,
        meals: action.payload,
        loading: false,
      };
    case DELETE_MEAL:
      const filteredMeals = state.meals.filter(
        (meal) => meal._id !== action.payload._id
      );

      return {
        ...state,
        meals: filteredMeals,
      };
    case SET_DATE_RANGE:
      return {
        ...state,
        dateRange: action.payload.range,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        loading: false,
      };
    case SET_MEAL_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default itemsReducer;
