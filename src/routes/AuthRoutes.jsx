import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BlankLayout from "../layouts/BlankLayout";

const AuthRoutes = () => {
  const user = useSelector((state) => state.auth.user);

  // If user is logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/user/dashboard" replace />;
  }

  return (
    <BlankLayout>
      <Outlet />
    </BlankLayout>
  );
};

export default AuthRoutes;
