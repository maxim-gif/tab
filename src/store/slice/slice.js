import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminData:[],
  participantData:[],
  history: [],
  activeIdCurse: "",
};

export const appSlice = createSlice({
  name: "participant",
  initialState,

  reducers: {
    setAdminData: (state, action) => {
      state.adminData = action.payload;
    },
    setParticipantData: (state, action) => {
      state.participantData = action.payload;
    },


    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setCursesActive: (state, action) => {
      state.activeIdCurse = action.payload;
    },
  },
});

export const {
  setAdminData,
  setParticipantData,
  setCursesActive,
  setHistory,
} = appSlice.actions;

export default appSlice.reducer;
