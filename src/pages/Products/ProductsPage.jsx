import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Sample Products Data (replace with dynamic data if needed)
const productsData = [
  {
    id: 1,
    name: "Product 1",
    description: "This is a description of product 1.",
    price: 25.0,
    category: "Electronics",
    image: "https://via.placeholder.com/400",
    slug: "product-1", // slug for the product
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is a description of product 2.",
    price: 30.0,
    category: "Clothing",
    image: "https://via.placeholder.com/400",
    slug: "product-2", // slug for the product
  },
  {
    id: 3,
    name: "Product 3",
    description: "This is a description of product 3.",
    price: 45.0,
    category: "Electronics",
    image: "https://via.placeholder.com/400",
    slug: "product-3", // slug for the product
  },
  {
    id: 4,
    name: "Product 4",
    description: "This is a description of product 4.",
    price: 55.0,
    category: "Clothing",
    image: "https://via.placeholder.com/400",
    slug: "product-4", // slug for the product
  },
];

const ProductsPage = () => {
  const [isSquareView, setIsSquareView] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 100,
  });

  const categories = ["Electronics", "Clothing", "Home", "Books", "Toys"];

  const toggleView = () => {
    setIsSquareView(!isSquareView);
  };

  // Handle filter changes
  const handleCategoryChange = (event) => {
    setFilters({ ...filters, category: event.target.value });
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  // Apply filters to products
  const filteredProducts = productsData.filter((product) => {
    const isInCategory = filters.category ? product.category === filters.category : true;
    const isInPriceRange = product.price >= filters.minPrice && product.price <= filters.maxPrice;
    return isInCategory && isInPriceRange;
  });

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto  flex">
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
            <div className="flex justify-between">
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handlePriceChange}
                className="w-1/2 p-2 border border-gray-300 rounded-md"
                placeholder="Min"
              />
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handlePriceChange}
                className="w-1/2 p-2 border border-gray-300 rounded-md"
                placeholder="Max"
              />
            </div>
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
                  <p className="text-lg font-bold text-blue-600 mt-4">{`$${product.price.toFixed(2)}`}</p>
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
