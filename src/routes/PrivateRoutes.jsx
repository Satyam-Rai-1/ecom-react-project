import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomLayout from "../layouts/CustomLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import ProfilePage from "../pages/Profile/ProfilePage";

const PrivateRoutes = () => {
  const user = useSelector((state) => state.auth.user);

  // If no user is logged in, redirect to login page
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Routes>
      {/* Route for /dashboard */}
      <Route
        path="/dashboard"
        element={
          <CustomLayout>
            <DashboardHome />
          </CustomLayout>
        }
      />

      {/* Route for /profile */}
      <Route
        path="/profile"
        element={
          <CustomLayout>
            <ProfilePage />
          </CustomLayout>
        }
      />
    </Routes>
  );
};

export default PrivateRoutes;
