const Cart = require("../Models/Cart");


// Get cart for user
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { userId: req.params.userId, cart: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user cart
exports.updateCart = async (req, res) => {
  try {
    const { userId, cart } = req.body;
    await Cart.findOneAndUpdate({ userId }, { cart }, { upsert: true });
    res.json({ message: "Cart updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Clear user cart
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.body.userId });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
