import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Sample Products Data (replace with dynamic data if needed)
const productsData = [
  {
    id: 1,
    name: "Product 1",
    description: "This is a description of product 1.",
    price: 250,
    category: "Electronics",
    image: "https://via.placeholder.com/400",
    slug: "product-1", // slug for the product
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is a description of product 2.",
    price: 1500,
    category: "Clothing",
    image: "https://via.placeholder.com/400",
    slug: "product-2", // slug for the product
  },
  {
    id: 3,
    name: "Product 3",
    description: "This is a description of product 3.",
    price: 5000,
    category: "Electronics",
    image: "https://via.placeholder.com/400",
    slug: "product-3", // slug for the product
  },
  {
    id: 4,
    name: "Product 4",
    description: "This is a description of product 4.",
    price: 1200,
    category: "Clothing",
    image: "https://via.placeholder.com/400",
    slug: "product-4", // slug for the product
  },
];

const ProductsPage = () => {
  const [isSquareView, setIsSquareView] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
  });

  const categories = ["Electronics", "Clothing", "Home", "Books", "Toys"];

  const toggleView = () => {
    setIsSquareView(!isSquareView);
  };

  // Handle filter changes
  const handleCategoryChange = (event) => {
    setFilters({ ...filters, category: event.target.value });
  };

  const handlePriceRangeChange = (event) => {
    setFilters({ ...filters, priceRange: event.target.value });
  };

  // Apply filters to products
  const filteredProducts = productsData.filter((product) => {
    const isInCategory = filters.category ? product.category === filters.category : true;

    let isInPriceRange = true;
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split("to").map((price) => parseInt(price.trim()));
      if (minPrice && maxPrice) {
        isInPriceRange = product.price >= minPrice && product.price <= maxPrice;
      } else if (filters.priceRange === "greater-than-5000") {
        isInPriceRange = product.price > 5000;
      }
    }

    return isInCategory && isInPriceRange;
  });

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 flex">
        {/* Left Sidebar - Filters */}
        <div className="w-1/4 bg-white p-6 rounded-lg shadow-md mr-8">
          <h3 className="text-2xl font-semibold mb-4">Filters</h3>

          {/* Category Filter */}
          <div className="mb-4">
            <h4 className="font-semibold">Category</h4>
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div className="mb-4">
            <h4 className="font-semibold">Price Range</h4>
            <select
              value={filters.priceRange}
              onChange={handlePriceRangeChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Prices</option>
              <option value="100 to 1000">₹100 to ₹1000</option>
              <option value="1000 to 5000">₹1000 to ₹5000</option>
              <option value="greater-than-5000">Greater than ₹5000</option>
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="w-3/4">
          <h2 className="text-3xl font-bold text-center mb-8">Products</h2>

          {/* Toggle View Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={toggleView}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              {isSquareView ? "Switch to Rectangular View" : "Switch to Square View"}
            </button>
          </div>

          {/* Product Grid */}
          <div
            className={`grid ${isSquareView ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"} gap-6`}
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover transition duration-300 ease-in-out transform hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-500 text-sm mt-2">{product.description}</p>
                  <p className="text-lg font-bold text-blue-600 mt-4">{`₹${product.price.toFixed(2)}`}</p>
                  <NavLink
                    to={`/product/${product.slug}`}
                    className="mt-4 inline-block text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded transition duration-300"
                  >
                    View Details
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
