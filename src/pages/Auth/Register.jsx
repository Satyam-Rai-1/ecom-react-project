import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggleButton from "../../components/Buttons/ThemeToggleButton";

const Register = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.theme); // Get theme from Redux
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Apply dark mode dynamically to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Handle registration
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  // Redirect after successful registration
  useEffect(() => {
    if (authState.user) {
      navigate("/dashboard");
    }
  }, [authState.user, navigate]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 transition-all duration-300`}>
      {/* Theme Toggle Button */}
      <ThemeToggleButton />

      <div className="w-full min-w-xs sm:min-w-sm md:max-w-md lg:min-w-lg xl:max-w-xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg dark:shadow-gray-700 transition-all duration-300">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {authState.error && <p className="text-red-500 text-sm">{authState.error}</p>}

          {/* Loading and Success State */}
          {authState.loading ? (
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md opacity-50 cursor-not-allowed"
              disabled
            >
              Registering...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
            >
              Register
            </button>
          )}
        </form>

        {/* Signup Link */}
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
