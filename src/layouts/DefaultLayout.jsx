import React from "react";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <header className="bg-blue-600 text-white p-4">Default Header</header>
      <main className="p-4">{children}</main>
      <footer className="bg-blue-600 text-white p-4 mt-4">Default Footer</footer>
    </div>
  );
};

export default DefaultLayout;
