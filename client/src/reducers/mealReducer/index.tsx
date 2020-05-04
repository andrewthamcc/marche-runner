import { endOfMonth, format, startOfMonth } from "date-fns";
import {
  ADD_MEAL,
  DELETE_MEAL,
  EDIT_MEAL,
  GET_MEALS,
  SET_DATE_RANGE,
  SET_DATES,
  SET_MEAL_LOADING,
} from "../../actions/meals/types";
import { Meal } from "../../models/meal";

export enum dateRange {
  week = "week",
  month = "month",
}

class MenuState {
  startDate: string = format(startOfMonth(new Date()), "yyyy-MM-dd");
  endDate: string = format(endOfMonth(new Date()), "yyyy-MM-dd");
  dateRange: dateRange = dateRange.month;
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
        ...state,
        meals: action.payload,
        loading: false,
      };
    case EDIT_MEAL:
      const editedMeals = state.meals.map((meal) => {
        if (meal._id === action.payload._id) {
          return action.payload;
        }

        return meal;
      });

      return {
        ...state,
        meals: editedMeals,
      };
    case DELETE_MEAL:
      const filteredMeals = state.meals.filter(
        (meal) => meal._id !== action.payload._id
      );

      return {
        ...state,
        meals: filteredMeals,
      };
    case SET_DATES:
      return {
        ...state,
        startDate: format(action.payload.startDate, "yyyy-MM-dd"),
        endDate: format(action.payload.endDate, "yyyy-MM-dd"),
      };
    case SET_DATE_RANGE:
      return {
        ...state,
        dateRange: action.payload.range,
        startDate: format(action.payload.startDate, "yyyy-MM-dd"),
        endDate: format(action.payload.endDate, "yyyy-MM-dd"),
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
