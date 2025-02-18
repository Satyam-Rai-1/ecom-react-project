import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg text-center bg-white p-10 rounded shadow">
        <h1 className="text-4xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-lg text-gray-700">Oops! The page you’re looking for doesn’t exist.</p>
        <a
          href="/"
          className="inline-block mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
