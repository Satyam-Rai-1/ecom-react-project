const express = require("express");
const { getAllBrands, createBrand, updateBrand, deleteBrand } = require("../Controllers/BrandController");
const router = express.Router();



// Brand routes
router.get("/brands", getAllBrands);
router.post("/brands", createBrand);
router.put("/brands/:id", updateBrand);
router.delete("/brands/:id", deleteBrand);

module.exports = router;
