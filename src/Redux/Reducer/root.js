import { combineReducers } from "redux";
import productsReducer from "./coursesReducer";
const rootReducer = combineReducers({
  coursesReducer: productsReducer,
});
export default rootReducer;
