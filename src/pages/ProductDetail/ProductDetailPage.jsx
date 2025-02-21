import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductBySlug } from "../../redux/features/productDetailSlice";
import { addToCart } from "../../redux/features/cartSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the default styles

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { product, status, error } = useSelector((state) => state.productDetail);

  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState(""); // To show error message

  useEffect(() => {
    dispatch(fetchProductBySlug(slug));
  }, [slug, dispatch]);

  const handleAddToCart = () => {
    const currentCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCartQuantity = currentCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    // Check if the total quantity would exceed stock
    if (totalCartQuantity + quantity > product.stock) {
      setErrorMessage(`Cannot add more than ${product.stock} items to the cart.`);
      return; // Prevent adding more than stock
    }

    // Add to cart only if within stock limit
    dispatch(addToCart({ ...product, quantity }));
    setErrorMessage(""); // Clear error message if valid
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  if (status === "loading") {
    return (
      <div className="product-page bg-gray-100 py-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Skeleton for Image */}
            <div className="w-full md:w-1/2 p-6 flex justify-center items-center">
              <Skeleton height={300} width={300} />
            </div>

            {/* Skeleton for Product Details */}
            <div className="w-full md:w-1/2 p-6">
              <Skeleton height={40} width={200} />
              <Skeleton count={3} height={20} width="100%" />
              <div className="flex items-center justify-between mt-6">
                <Skeleton height={30} width={150} />
                <Skeleton height={40} width={150} />
              </div>
              <div className="mt-6">
                <Skeleton height={20} width={120} />
                <Skeleton count={3} height={15} width="60%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  const isIncrementDisabled = quantity >= product.stock;
  const isDecrementDisabled = quantity <= 1;

  return (
    <div className="product-page bg-gray-100 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Image Section */}
          <div className="w-full md:w-1/2 p-6 flex justify-center items-center">
            <img
              src={product?.image || "https://dummyimage.com/400"}
              alt={product?.name}
              className="w-full max-w-md h-auto object-cover rounded-md shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 p-6">
            <h2 className="text-3xl font-semibold text-gray-800">{product?.name}</h2>
            <p className="text-sm text-gray-600 mt-2">{product?.description}</p>
            <div className="flex items-center justify-between mt-6">
              <p className="text-2xl font-bold text-gray-900">₹{product?.price?.toFixed(2)}</p>
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
              >
                Add to Cart
              </button>
            </div>

            {/* Quantity Controls */}
            <div className="mt-6 flex items-center space-x-3">
              <button
                onClick={decrementQuantity}
                disabled={isDecrementDisabled}
                className={`${
                  isDecrementDisabled ? "bg-red-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                } text-white px-4 py-2 rounded-md transition duration-300`}
              >
                -
              </button>

              <span className="text-xl font-semibold text-gray-800">{quantity}</span>

              <button
                onClick={incrementQuantity}
                disabled={isIncrementDisabled}
                className={`${
                  isIncrementDisabled ? "bg-red-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                } text-white px-4 py-2 rounded-md transition duration-300`}
              >
                +
              </button>
            </div>

            {/* Error Message if quantity exceeds stock */}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-700">Product Details:</h4>
              <ul className="text-gray-600 list-disc pl-5 mt-2">
                <li>Brand: {product?.brand?.name}</li>
                <li>Category: {product?.category?.name}</li>
                <li>Availability: {product?.stock > 0 ? "In Stock" : "Out of Stock"}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
