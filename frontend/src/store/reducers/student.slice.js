import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student: {},
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    getStudentRequest(state, action) {
      state.loading = true;
    },
    getStudentSuccess(state, action) {
      state.student = action.payload;
      state.loading = false;
    },
    getStudentFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createStudentRequest(state, action) {
      state.loading = true;
    },
    createStudentSuccess(state, action) {
      state.student.push(action.payload);
      state.loading = false;
    },
    createStudentFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateStudentRequest(state, action) {
      state.loading = true;
    },
    updateStudentSuccess(state, action) {
      state.student = { ...state.student, ...action.payload };
      state.loading = false;
    },
    updateStudentFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteStudentRequest(state, action) {
      state.loading = true;
    },
    deleteStudentSuccess(state, action) {
      state.student = state.student.filter(
        (student) => student._id !== action.payload
      );
      state.loading = false;
    },
    deleteStudentFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getStudentRequest,
  getStudentSuccess,
  getStudentFailure,
  createStudentRequest,
  createStudentSuccess,
  createStudentFailure,
  updateStudentRequest,
  updateStudentSuccess,
  updateStudentFailure,
  deleteStudentRequest,
  deleteStudentSuccess,
  deleteStudentFailure,
} = studentSlice.actions;

export default studentSlice.reducer;
