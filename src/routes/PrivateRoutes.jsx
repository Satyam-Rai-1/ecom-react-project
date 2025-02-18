import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomLayout from "../layouts/CustomLayout";

const PrivateRoutes = () => {
  const user = useSelector((state) => state.auth.user);

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Wrap all private pages inside CustomLayout
  return (
    <CustomLayout>
      <Outlet />
    </CustomLayout>
  );
};

export default PrivateRoutes;
