import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    participant: [],
    moderators: [],
};

export const appSlice = createSlice({
  name: "participant",
  initialState,

  reducers: {
    setParticipant: (state, action) => {
      state.participant = action.payload;
    },
    setModerators: (state, action) => {
      state.moderators = action.payload;
    },
  },
});

export const { setParticipant, setModerators } = appSlice.actions;

export default appSlice.reducer;