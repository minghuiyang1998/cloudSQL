import { combineReducers } from "redux";
import connectionReducer from "./connection";
import queryReducer from "./query";
import schemaReducer from "./schema";

export default combineReducers({
  connectionReducer,
  queryReducer,
  schemaReducer
});