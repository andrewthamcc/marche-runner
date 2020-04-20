import { combineReducers } from "redux";

import authState from "./authReducer";
import userState from "./userReducer";
import itemsState from "./itemsReducer";

const AppState = { authState, userState, itemsState };

export default combineReducers(AppState);
