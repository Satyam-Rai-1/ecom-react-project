import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchProducts } from "../../redux/features/productsSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  console.log("products", products);

  const [isSquareView, setIsSquareView] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
  });

  // Determine items per page based on view type
  const itemsPerPage = isSquareView ? 2 : 6; // max 2 rows: 2 for square (1 col) or 6 for rectangular (3 cols)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const categories = ["Electronics", "Clothing", "Home", "Books", "Toys"];

  const toggleView = () => {
    setIsSquareView(!isSquareView);
    setCurrentPage(1);
  };

  // Handle filter changes
  const handleCategoryChange = (event) => {
    setFilters({ ...filters, category: event.target.value });
    setCurrentPage(1); // Reset pagination when filters change
  };

  const handlePriceRangeChange = (event) => {
    setFilters({ ...filters, priceRange: event.target.value });
    setCurrentPage(1);
  };

  // Apply filters
  const filteredProducts = products.filter((product) => {
    const isInCategory = filters.category ? product.category === filters.category : true;

    let isInPriceRange = true;
    if (filters.priceRange) {
      if (filters.priceRange === "greater-than-5000") {
        isInPriceRange = product.price > 5000;
      } else {
        const [minPrice, maxPrice] = filters.priceRange
          .split("to")
          .map((price) => parseInt(price.trim()));
        if (minPrice && maxPrice) {
          isInPriceRange = product.price >= minPrice && product.price <= maxPrice;
        }
      }
    }

    return isInCategory && isInPriceRange;
  });

  // Pagination: determine current page products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-gray-100 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row">
        {/* Left Sidebar - Filters */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md mr-0 md:mr-8 mb-6 md:mb-0">
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
        <div className="w-full md:w-3/4">
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

          {/* Loading and Error Handling */}
          {status === "loading" && (
            <p className="text-center text-gray-500">Loading products...</p>
          )}
          {status === "failed" && (
            <p className="text-center text-red-500">Error: {error}</p>
          )}

          {/* Product Grid */}
          {status === "succeeded" && (
            <div>
              <div
                className={`grid ${
                  isSquareView
                    ? "grid-cols-1"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                } gap-6 min-h-[300px]`}
              >
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <div
                      key={product._id}
                      className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                        isSquareView ? "flex items-center" : ""
                      }`}
                    >
                      {/* Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-auto ${
                          isSquareView
                            ? "w-1/2 h-48 object-cover"
                            : "h-48 object-cover"
                        } transition duration-300 ease-in-out transform hover:scale-105`}
                      />

                      {/* Product Details */}
                      <div className={`p-4 ${isSquareView ? "w-1/2" : ""}`}>
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p className="text-gray-500 text-sm mt-2">
                          {product.description}
                        </p>
                        <p className="text-lg font-bold text-blue-600 mt-4">
                          {`₹${product.price.toFixed(2)}`}
                        </p>
                        <NavLink
                          to={`/product/${product.slug}`}
                          className="mt-4 inline-block text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded transition duration-300"
                        >
                          View Details
                        </NavLink>
                      </div>
                    </div>
                  ))
                ) : (
                  // Friendly "no products" state
                  <div className="col-span-full flex flex-col items-center justify-center py-10">
                    <img
                      src="https://via.placeholder.com/150?text=No+Products"
                      alt="No products found"
                      className="mb-4 opacity-50"
                    />
                    <p className="text-center text-gray-500 text-lg">
                      Oops! We couldn’t find any products matching your filters.
                    </p>
                  </div>
                )}
              </div>

              {/* Pagination Controls */}
              {filteredProducts.length > itemsPerPage && (
                <div className="flex justify-center items-center mt-6">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 mx-1 rounded ${
                      currentPage === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="mx-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 mx-1 rounded ${
                      currentPage === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
