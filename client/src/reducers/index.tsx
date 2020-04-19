import { combineReducers } from "redux";

import authReducer from "./authReducer";
import itemsReducer from "./itemsReducer";

const AppState = { authReducer, itemsReducer };

export default combineReducers(AppState);
