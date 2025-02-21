const express = require("express");
const { getCart, updateCart, clearCart } = require("../Controllers/CartController");
const router = express.Router();

router.get("/:userId", getCart);
router.post("/update", updateCart);
router.post("/clear", clearCart);

module.exports = router;
