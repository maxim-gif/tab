import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminData:[],
  participantData:[],
  history: [],
  priorityData: [],
};

export const appSlice = createSlice({
  name: "participant",
  initialState,

  reducers: {
    setAdminData: (state, action) => {
      state.adminData = action.payload;
    },
    setPriorityData: (state, action) => {
      state.priorityData = action.payload;
    },
    setParticipantData: (state, action) => {
      state.participantData = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const {
  setAdminData,
  setParticipantData,
  setHistory,
  setPriorityData,
} = appSlice.actions;

export default appSlice.reducer;
