import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import NotFound from "./pages/NotFound";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import ProfilePage from "./pages/Profile/ProfilePage";
import Home from "./pages/Home/Home"
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<PublicRoutes />} /> */}
        {/* Auth Route */}
        <Route path="/auth/*" element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>


        {/* Public Routes */}
        <Route path="/" element={<PublicRoutes />}>
          <Route index element={<Home />} />
          {/* <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} /> */}
        </Route>

         {/* Contact Page - Uses Custom Blank Layout */}
         {/* <Route path="/contact"  element={<BlankLayout><Contact /></BlankLayout>}/> */}

        {/* Private Routes */}
        <Route path="/user/*" element={<PrivateRoutes />}>
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

           {/* Profile Route (Uses DefaultLayout) */}
           {/* <Route path="/user/profile"  element={ <DefaultLayout>  <Profile /></DefaultLayout>}/> */}
 
        {/* NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
