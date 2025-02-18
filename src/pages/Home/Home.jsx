import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";
import ThemeToggleButton from "../../components/Buttons/ThemeToggleButton";


const Home = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // Access the theme from the Redux store

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Hero Section */}
      <ThemeToggleButton/>
      <div
        className={`relative bg-cover bg-center h-80 flex items-center justify-center text-white text-center ${theme === "dark" ? "bg-gray-900" : "bg-blue-500"}`}
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?phone,case')" }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl font-bold">Premium Mobile Back Covers</h1>
          <p className="mt-2 text-lg">Stylish | Durable | Affordable</p>
          <button className="mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg">
            Shop Now
          </button>
        </div>
      </div>
      {/* <ThemeToggleButton/> */}

  
      {/* Content */}
      <div className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Trending Back Covers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Product Cards */}
          {[
            { img: "https://source.unsplash.com/300x400/?iphone,case", name: "iPhone Carbon Fiber Cover", price: "$15.99" },
            { img: "https://source.unsplash.com/300x400/?samsung,case", name: "Samsung Transparent Cover", price: "$12.99" },
            { img: "https://source.unsplash.com/300x400/?oneplus,case", name: "OnePlus Matte Finish Cover", price: "$14.99" },
            { img: "https://source.unsplash.com/300x400/?pixel,case", name: "Google Pixel Premium Cover", price: "$16.99" }
          ].map((product, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4">
              <img src={product.img} alt={product.name} className="w-full h-48 object-cover rounded-md" />
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-700">{product.price}</p>
              <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg w-full">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>© 2025 BackCoverShop. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
