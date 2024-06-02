import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    participant: [],
};

export const participantSlice = createSlice({
  name: "participant",
  initialState,

  reducers: {
    setParticipant: (state, action) => {
      state.participant = action.payload;
    },
  },
});

export const { setParticipant } = participantSlice.actions;

export default participantSlice.reducer;