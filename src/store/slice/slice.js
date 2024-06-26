import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    participant: [],
    moderators: [],
    member1: [],
    member2: [],
    member3: [],
    member4: [],
    uncompleted1: [],
    curses: [],
    nameMembers:[],
    history:[],
    activeIdCurse:''
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
    setUncompleted1: (state, action) => { 
      state.uncompleted1 = action.payload;
    },
    setCurses: (state, action) => {
      state.curses = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setCursesActive: (state, action) => {
      state.activeIdCurse = action.payload;
    },
    setNameMembers: (state, action) => {
      state.nameMembers = action.payload === null ? []:action.payload;
    },
  },
});

export const { setParticipant, setModerators,setMember1,setMember2,setMember3,setMember4,setCurses,setNameMembers,setCursesActive,setHistory,setUncompleted1 } = appSlice.actions;

export default appSlice.reducer;