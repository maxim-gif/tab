import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    participant: [],
    moderators: [],
    member1: [],
    member2: [],
    member3: [],
    member4: [], 
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
    setMember1: (state, action) => {
      state.member1 = action.payload;
    },
    setMember2: (state, action) => {
      state.member2 = action.payload;
    },
    setMember3: (state, action) => {
      state.member3 = action.payload;
    },
    setMember4: (state, action) => {
      state.member4 = action.payload;
    },
  },
});

export const { setParticipant, setModerators,setMember1,setMember2,setMember3,setMember4 } = appSlice.actions;

export default appSlice.reducer;