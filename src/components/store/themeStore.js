import { createSlice } from "@reduxjs/toolkit";

const initialTheme = {
  isDarkTheme: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialTheme,
  reducers: {
    toggleTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});


export const themeActions = themeSlice.actions;
export default themeSlice.reducer;