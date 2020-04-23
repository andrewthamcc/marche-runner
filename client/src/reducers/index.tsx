import { combineReducers } from "redux";

import authState from "./authReducer";
import userState from "./userReducer";
import itemState from "./itemsReducer";
import uiState from "./uiReducer";

const AppState = { authState, userState, itemState, uiState };

export default combineReducers(AppState);
