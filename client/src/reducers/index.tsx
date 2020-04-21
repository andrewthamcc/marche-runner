import { combineReducers } from "redux";

import authState from "./authReducer";
import userState from "./userReducer";
import itemState from "./itemsReducer";

const AppState = { authState, userState, itemState };

export default combineReducers(AppState);
