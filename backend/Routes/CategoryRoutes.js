const express = require("express");
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require("../Controllers/CategoryController");
const router = express.Router();

// GET /api/categories - Get all categories
router.get("/", getAllCategories);

// POST /api/categories - Create a new category
router.post("/", createCategory);

// PUT /api/categories/:id - Update a category
router.put("/:id", updateCategory);

// DELETE /api/categories/:id - Delete a category
router.delete("/:id", deleteCategory);

module.exports = router;
