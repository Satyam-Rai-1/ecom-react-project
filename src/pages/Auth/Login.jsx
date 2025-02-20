import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/features/authSlice";
import ThemeToggleButton from "../../components/Buttons/ThemeToggleButton";

const Login = () => {
  const [email, setEmail] = useState("satyam@gmail.com");
  const [password, setPassword] = useState("123456");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = { email, password };

    dispatch(loginUser(credentials)).then((result) => {
      if (result.type === "auth/loginUser/fulfilled") {
        navigate("/user/dashboard");
      }
    });
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100 dark:bg-green-900 px-4 sm:px-6">
  
  <ThemeToggleButton/>
      <div
        className="w-full min-w-xs sm:min-w-sm md:max-w-md lg:min-w-lg xl:max-w-xl
        bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg dark:shadow-gray-700 transition-all duration-300"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white">
          Welcome Back
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mt-1 sm:mt-2">
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="mt-4 sm:mt-6">
          {/* Email Field */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 sm:p-3 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 sm:p-3 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
                                                                            
        </form>

        {/* Signup Link */}
        <div className="text-center mt-3 sm:mt-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
          <Link to="/" className="text-blue-500 hover:underline">Home
          {/* <p  className="w-full py-2 sm:py-3  font-semibold  transition duration-300" >home</p> */}
          </Link> 
        </div>
      </div>
    </div>
  );
};

export default Login;
