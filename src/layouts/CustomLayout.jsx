import React from "react";

const CustomLayout = ({ children }) => {
  return (
    <div>
      <header className="bg-green-600 text-white p-4">Custom Header</header>
      <main className="p-4">{children}</main>
      <footer className="bg-green-600 text-white p-4 mt-4">Custom Footer</footer>
    </div>
  );
};

export default CustomLayout;
