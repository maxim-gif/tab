import { configureStore } from "@reduxjs/toolkit";
import participantReducer from "./slice/slice";

export const store = configureStore({
  reducer: {
    table: participantReducer,
  },
});