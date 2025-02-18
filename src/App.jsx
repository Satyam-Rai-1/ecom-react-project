import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/public/*" element={<PublicRoutes />} />
        <Route path="/user/*" element={<PrivateRoutes />} />  {/*  private */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
