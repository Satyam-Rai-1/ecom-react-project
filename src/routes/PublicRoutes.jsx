import React from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home/Home";

const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
  </Routes>
);

export default PublicRoutes;
