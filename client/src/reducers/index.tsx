import { combineReducers } from "redux";

import authState from "./authReducer";
import itemsState from "./itemsReducer";

const AppState = { authState, itemsState };

export default combineReducers(AppState);
