import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminData:[],
  participantData:[],
  history: [],
  priorityData: [],
  widgetData: [],
  widgetCurses: [],
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
    setWidgetData: (state, action) => {
      state.widgetData = action.payload;
    },
    setWidgetCurses: (state, action) => {
      state.widgetCurses = action.payload;
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
  setWidgetData,
  setWidgetCurses,
} = appSlice.actions;

export default appSlice.reducer;
