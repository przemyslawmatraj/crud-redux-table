import { configureStore } from "@reduxjs/toolkit";
import userTableReducer from "../features/userTable/userTableSlice";
import languageReducer from "../features/internationalization/internationalizationSlice";

export const store = configureStore({
  reducer: {
    userTable: userTableReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
