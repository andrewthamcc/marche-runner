import { combineReducers } from "redux";

import authState from "./authReducer";
import userState from "./userReducer";
import itemState from "./itemsReducer";
import uiState from "./uiReducer";
import mealState from "./mealReducer";

const AppState = { authState, userState, itemState, mealState, uiState };

export default combineReducers(AppState);
