import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem('theme') || 'light', // Persist theme preference
};

// Function to apply theme globally
const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark'); // Add dark class to <html>
  } else {
    document.documentElement.classList.remove('dark'); // Remove dark class from <html>
  }
  localStorage.setItem('theme', theme);
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      applyTheme(state.theme); // Apply theme globally
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      applyTheme(action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;

// Apply theme on page load
applyTheme(initialState.theme);
