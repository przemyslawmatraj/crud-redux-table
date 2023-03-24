import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const Languages = [
  {
    locale: "enUS",
    name: "🇬🇧 English",
  },
  {
    locale: "plPL",
    name: "🇵🇱 Polski",
  },
] as const;

export type AvailableLanguages = typeof Languages[number];

export type Language = {
  currentLanguage: AvailableLanguages;
};

const initialState: Language = {
  currentLanguage: Languages[0],
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = Languages.find(
        (language) => language.locale === action.payload
      ) as AvailableLanguages;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export const selectCurrentLanguage = (state: RootState) =>
  state.language.currentLanguage;

export default languageSlice.reducer;
