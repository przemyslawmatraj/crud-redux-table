import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

import enUS from "../../lang/enUS.json";
import plPL from "../../lang/plPL.json";

export const Languages = [
  {
    locale: "enUS",
    name: "🇬🇧 English",
    messages: enUS,
  },
  {
    locale: "plPL",
    name: "🇵🇱 Polski",
    messages: plPL,
  },
] as const;

export type AvailableLanguages = typeof Languages[number];

export type Language = {
  currentLanguage: AvailableLanguages;
};

const getPreferredLanguage = () => {
  const preferredLanguage = Languages.find(
    (language) => language.locale === navigator.language.replace("-", "")
  );
  return preferredLanguage || Languages[0];
};

const initialState: Language = {
  currentLanguage: getPreferredLanguage(),
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
