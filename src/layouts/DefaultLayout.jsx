import React from "react";
import Navbar from "./Navbars/Navbar";
import Footer from "./Footers/Footer";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      {/* Add Navbar here */}
      <Navbar />
      
      <main className="">{children}</main>

      <Footer/>
    </div>
  );
};

export default DefaultLayout;
