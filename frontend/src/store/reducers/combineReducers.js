import { combineReducers } from "redux";
// import student reducer
import studentReducer from "./student.slice";
// import demands reducer
import demandsReducer from "./demands.slice";
// import auth reducer
import authReducer from "./auth.slice";

const rootReducer = combineReducers({
  student: studentReducer,
  demands: demandsReducer,
  auth: authReducer,
});
export default rootReducer;
