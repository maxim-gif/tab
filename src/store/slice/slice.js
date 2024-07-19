import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminData:[],
  participantData:[],
  history: [],
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
  },
});

export const {
  setAdminData,
  setParticipantData,
  setHistory,
} = appSlice.actions;

export default appSlice.reducer;
