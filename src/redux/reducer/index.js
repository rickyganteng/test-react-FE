import { combineReducers } from "redux";
import counter from "./counter";
import barang from "./barang"

export default combineReducers({
  counter,
  barang
});