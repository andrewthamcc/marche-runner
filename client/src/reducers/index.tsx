import { combineReducers } from "redux";

import authState from "./authReducer";
import userState from "./userReducer";
import itemState from "./itemsReducer";
import uiState from "./uiReducer";
import mealState from "./mealReducer";

const reducers = { authState, userState, itemState, mealState, uiState };

const RootState = combineReducers(reducers);

export type AppState = ReturnType<typeof RootState>;

export default RootState;
