import React from "react";
import { Outlet } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";

const PublicRoutes = () => {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

export default PublicRoutes;
