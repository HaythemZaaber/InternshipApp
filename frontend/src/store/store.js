import { configureStore } from "@reduxjs/toolkit";
// import student reducer
import rootReducer from "./reducers/combineReducers";

const store = configureStore({
    reducer: rootReducer,
});

export default store;
