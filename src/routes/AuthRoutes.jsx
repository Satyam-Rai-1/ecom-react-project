import React from "react";
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

const AuthRoutes = () => (
  <Routes>
    <Route path="/login" element={<BlankLayout><Login /></BlankLayout>} />
    <Route path="/register" element={<BlankLayout><Register /></BlankLayout>} />
  </Routes>
);

export default AuthRoutes;
