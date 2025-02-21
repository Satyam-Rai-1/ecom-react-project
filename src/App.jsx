import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Lazy load components
const AuthRoutes = React.lazy(() => import("./routes/AuthRoutes"));
const PublicRoutes = React.lazy(() => import("./routes/PublicRoutes"));
const PrivateRoutes = React.lazy(() => import("./routes/PrivateRoutes"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const DashboardHome = React.lazy(() => import("./pages/Dashboard/DashboardHome"));
const ProfilePage = React.lazy(() => import("./pages/Profile/ProfilePage"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const Register = React.lazy(() => import("./pages/Auth/Register"));
const Login = React.lazy(() => import("./pages/Auth/Login"));
const ProductsPage = React.lazy(() => import("./pages/Products/ProductsPage"));
const ProductDetailPage = React.lazy(() => import("./pages/ProductDetail/ProductDetailPage"));


const App = () => {
  return (
    <Router>
       <Suspense fallback={<div className="spinner-container"><div className="spinner"></div></div>}>
        <Routes>
          {/* Auth Route */}
          <Route path="/auth/*" element={<AuthRoutes />}>
            <Route index element={<Navigate to="/auth/login" />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Public Routes */}
          <Route path="/" element={<PublicRoutes />}>
            <Route index element={<Home />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="product/:slug" element={<ProductDetailPage />} />
          </Route>

          {/* Private Routes */}
          <Route path="/user/*" element={<PrivateRoutes />}>
            <Route index element={<Navigate to="/user/dashboard" />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* NotFound */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
