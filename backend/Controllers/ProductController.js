const Product = require("../Models/Product");

// Helper function to format validation errors
const formatValidationErrors = (error) => {
  return Object.values(error.errors).map(val => val.message);
};

// Get all products with populated brand and category details
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("brand", "name")
      .populate("category", "name description");
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error, unable to fetch products",
      error: error.message,
    });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, slug, stock, isFeatured, brand } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !image || !slug || !brand) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, description, price, category, image, slug, and brand are required.",
      });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      image,
      slug,
      stock: stock || 0,
      isFeatured: isFeatured || false,
      brand,
    });

    const savedProduct = await product.save();

    // Optionally populate brand and category before returning response
    const populatedProduct = await Product.findById(savedProduct._id)
      .populate("brand", "name")
      .populate("category", "name description");

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: populatedProduct,
    });
  } catch (error) {
    // Handle duplicate key error (e.g., slug conflict)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate value error: ensure the slug or other unique fields are not repeated.",
      });
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = formatValidationErrors(error);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error, unable to create product",
      error: error.message,
    });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No update data provided",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Populate updated product details
    const populatedProduct = await Product.findById(updatedProduct._id)
      .populate("brand", "name")
      .populate("category", "name description");

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: populatedProduct,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate field value entered. Please check unique fields.",
      });
    }

    if (error.name === "ValidationError") {
      const errors = formatValidationErrors(error);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error, unable to update product",
      error: error.message,
    });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error, unable to delete product",
      error: error.message,
    });
  }
};
