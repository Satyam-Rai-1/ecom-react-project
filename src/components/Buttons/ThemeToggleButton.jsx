import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";

const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="fixed top-4 right-4 px-4 py-2 rounded-full transition-all bg-gray-800 text-white hover:bg-gray-600 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-400"
    >
      {theme === "dark" ? "Light Mode ☀️" : "Dark Mode 🌙"}
    </button>
  );
};

export default ThemeToggleButton;
