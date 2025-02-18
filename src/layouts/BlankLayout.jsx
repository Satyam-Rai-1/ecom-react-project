import React from "react";
import { useSelector } from "react-redux";
import ThemeToggleButton from "../components/Buttons/ThemeToggleButton";

const BlankLayout = ({ children }) => {

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 sm:p-6 transition-all duration-300 
        bg-gray-100 text-black dark:bg-gray-900 dark:text-white`}
    >
        {children}
     
    </div>
  );
};

export default BlankLayout;
