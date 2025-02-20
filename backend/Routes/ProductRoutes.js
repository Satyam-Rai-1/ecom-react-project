const express = require("express");
const router = express.Router();
const { getAllProducts,createProduct,deleteProduct,updateProduct } = require("../Controllers/ProductController");

// GET all products
router.get("/products", getAllProducts);

// POST a new product
router.post("/products", createProduct);

// PUT update a product by ID
router.put("/products/:id", updateProduct);

// DELETE a product by ID
router.delete("/products/:id", deleteProduct);

module.exports = router;
