import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchProducts } from "../../redux/features/productsSlice";
import { fetchBrands } from "../../redux/features/brandsSlice";
import { fetchCategories } from "../../redux/features/categoriesSlice";
import Skeleton from "react-loading-skeleton"; 

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brands);

  const [isSquareView, setIsSquareView] = useState(false);
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    priceRange: "",
  });
  const itemsPerPage = isSquareView ? 2 : 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [status, dispatch]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) => {
    const isInCategory = filters.category ? product.category?._id === filters.category : true;
    const isInBrand = filters.brand ? product.brand?._id === filters.brand : true;
    let isInPriceRange = true;
    if (filters.priceRange) {
      if (filters.priceRange === "greater-than-5000") {
        isInPriceRange = product.price > 5000;
      } else {
        const [minPrice, maxPrice] = filters.priceRange.split("to").map(Number);
        isInPriceRange = product.price >= minPrice && product.price <= maxPrice;
      }
    }
    return isInCategory && isInBrand && isInPriceRange;
  });

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

  const toggleView = () => {
    setIsSquareView(!isSquareView);
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-100 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md mr-0 md:mr-8 mb-6 md:mb-0">
          <h3 className="text-2xl font-semibold mb-4">Filters</h3>
          <div className="mb-4">
            <h4 className="font-semibold">Category</h4>
            <select name="category" value={filters.category} onChange={handleFilterChange} className="w-full p-2 border rounded-md">
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Brand</h4>
            <select name="brand" value={filters.brand} onChange={handleFilterChange} className="w-full p-2 border rounded-md">
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>{brand.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Price Range</h4>
            <select name="priceRange" value={filters.priceRange} onChange={handleFilterChange} className="w-full p-2 border rounded-md">
              <option value="">All Prices</option>
              <option value="100 to 1000">₹100 to ₹1000</option>
              <option value="1000 to 5000">₹1000 to ₹5000</option>
              <option value="greater-than-5000">Greater than ₹5000</option>
            </select>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <h2 className="text-3xl font-bold text-center mb-8">Products</h2>
          <div className="flex justify-center mb-6">
            <button onClick={toggleView} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              {isSquareView ? "Switch to Rectangular View" : "Switch to Square View"}
            </button>
          </div>
          {status === "loading" &&
          <>
          
          {/* <Skeleton circle={true} height={50} width={50} />
          <Skeleton style={{ borderRadius: 10 }} />
          <Skeleton className="foobar" /> */}
           <Skeleton count={6} height={200} />
          </>
           }

          {status === "failed" && <p className="text-center text-red-500">Error: {error}</p>}

          {status === "succeeded" && (
            <div>
              <div className={`grid ${isSquareView ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"} gap-6 min-h-[300px]`}>
                {currentProducts.map((product) => (
                  <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img src={product.image || "https://dummyimage.com/400"} alt={product.name}
                     className="w-auto h-48 object-cover transition duration-300 hover:scale-105" />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="text-gray-500 text-sm mt-2">{product.description}</p>
                      <p className="text-lg font-bold text-blue-600 mt-4">₹{product.price.toFixed(2)}</p>
                      <NavLink to={`/product/${product.slug}`} className="mt-4 inline-block text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded transition">View Details</NavLink>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center mt-6">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50">Previous</button>
                <span className="mx-2">Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50">Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
