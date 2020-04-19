import { combineReducers } from "redux";

import userReducer from "./userReducer";

const AppState = { userReducer };

export default combineReducers(AppState);
