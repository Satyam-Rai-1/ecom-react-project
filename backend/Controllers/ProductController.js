const Product = require("../Models/Product");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
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
    const { name, description, price, category, image, slug, stock, isFeatured } = req.body;
    
    // Check if required fields exist
    if (!name || !description || !price || !category || !image || !slug) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, description, price, category, image, and slug are required.",
      });
    }
    
    // Create a new product instance
    const product = new Product({
      name,
      description,
      price,
      category,
      image,
      slug,
      stock: stock || 0,
      isFeatured: isFeatured || false,
    });
    
    // Save to the database
    const savedProduct = await product.save();
    
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    // Handle duplicate key error for slug
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Slug must be unique. The provided slug already exists.",
      });
    }
    
    // Validation errors from Mongoose
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: messages,
      });
    }
    
    // Server error
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

    // Optionally, validate required fields if necessary.
    // For example, you can check if at least one field is provided for update:
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No update data provided",
      });
    }

    // Update product: new: true returns the updated document
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

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    // Handle duplicate key error (e.g., slug conflict)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate field value entered. The slug must be unique.",
      });
    }

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: messages,
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

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Use deleteOne on the document instance
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

