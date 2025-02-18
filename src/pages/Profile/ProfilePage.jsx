import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/authSlice"; // Import your logout action

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    return <p>Loading...</p>; // If user is not available, you can show a loading message or redirect them to login
  }

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());

    // Redirect to the login page after logout
    navigate("/auth/login");
  };

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Add any additional profile details here */}
      
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
