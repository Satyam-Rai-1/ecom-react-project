const Brand = require("../Models/Brand");

// Get all brands
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.status(200).json({
      success: true,
      count: brands.length,
      data: brands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error, unable to fetch brands",
      error: error.message,
    });
  }
};

// Create a new brand
exports.createBrand = async (req, res) => {
  try {
    const { name, description, logo } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Brand name is required",
      });
    }

    const brand = new Brand({
      name,
      description,
      logo,
    });

    const savedBrand = await brand.save();

    res.status(201).json({
      success: true,
      message: "Brand created successfully",
      data: savedBrand,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Brand already exists. Please use a different name.",
      });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error, unable to create brand",
      error: error.message,
    });
  }
};

// Update a brand by ID
exports.updateBrand = async (req, res) => {
  try {
    const brandId = req.params.id;
    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No update data provided",
      });
    }

    const updatedBrand = await Brand.findByIdAndUpdate(brandId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBrand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      data: updatedBrand,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate brand name entered. Please use a different name.",
      });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error, unable to update brand",
      error: error.message,
    });
  }
};

// Delete a brand by ID
exports.deleteBrand = async (req, res) => {
  try {
    const brandId = req.params.id;
    const brand = await Brand.findById(brandId);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    await brand.deleteOne();

    res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error, unable to delete brand",
      error: error.message,
    });
  }
};
