import React from "react";
import Navbar from "./Navbars/Navbar";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      {/* Add Navbar here */}
      <Navbar />
      
      <main className="">{children}</main>

      <footer className="bg-blue-600 text-white p-4 mt-4">Default Footer</footer>
    </div>
  );
};

export default DefaultLayout;
