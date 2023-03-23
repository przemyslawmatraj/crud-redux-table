import { configureStore } from "@reduxjs/toolkit";
import userTableReducer from "../features/userTable/userTableSlice";

export const store = configureStore({
  reducer: {
    userTable: userTableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
