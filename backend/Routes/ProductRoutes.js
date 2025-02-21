const express = require("express");
const router = express.Router();
const { getAllProducts,createProduct,deleteProduct,updateProduct, getProductBySlug } = require("../Controllers/ProductController");

// GET all products
router.get("/products", getAllProducts);

// POST a new product
router.post("/products", createProduct);

// PUT update a product by ID
router.put("/products/:id", updateProduct);

// Get product by slug
router.route("/products/:slug").get(getProductBySlug); 


// DELETE a product by ID
router.delete("/products/:id", deleteProduct);

module.exports = router;
