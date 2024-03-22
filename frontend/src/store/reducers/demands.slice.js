import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  demands: [],
  loading: false,
  error: null,
};

const demandsSlice = createSlice({
  name: "demands",
  initialState,
  reducers: {
    getDemandsRequest(state, action) {
      state.loading = true;
    },
    getDemandsSuccess(state, action) {
      state.demands = action.payload;
      state.loading = false;
    },
    getDemandsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createDemandsRequest(state, action) {
      state.loading = true;
    },
    createDemandsSuccess(state, action) {
      state.demands.push(action.payload);
      state.loading = false;
    },
    createDemandsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateDemandsRequest(state, action) {
      state.loading = true;
    },
    updateDemandsSuccess(state, action) {
      state.demands = state.demands.map((demand) =>
        demand._id !== action.payload._id ? action.payload : demand
      );
      state.loading = false;
    },
    updateDemandsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteDemandsRequest(state, action) {
      state.loading = true;
    },
    deleteDemandsSuccess(state, action) {
      state.demands = state.demands.filter(
        (demands) => demands._id !== action.payload
      );
      state.loading = false;
    },
    deleteDemandsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getDemandsRequest,
  getDemandsSuccess,
  getDemandsFailure,
  createDemandsRequest,
  createDemandsSuccess,
  createDemandsFailure,
  updateDemandsRequest,
  updateDemandsSuccess,
  updateDemandsFailure,
  deleteDemandsRequest,
  deleteDemandsSuccess,
  deleteDemandsFailure,
} = demandsSlice.actions;

export default demandsSlice.reducer;
