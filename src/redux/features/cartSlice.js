import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state with cart data from localStorage or an empty cart
const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [], 
  totalQuantity: 0,
  totalAmount: 0,
  userId: null,  // Track logged-in user
};

// Helper function to update total quantity and amount
const updateCartSummary = (items) => {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
  return { totalQuantity, totalAmount };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, quantity, price, stock, userId } = action.payload;
      
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        if (existingItem.quantity < stock) { 
          existingItem.quantity += quantity;
        }
      } else {
        state.items.push({ ...action.payload, quantity: quantity });
      }

      // Update cart summary
      const { totalQuantity, totalAmount } = updateCartSummary(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;

      if (userId) {
        // Save to database if user is logged in
        axios.post("/api/cart/update", { userId, cart: state.items });
      } else {
        // Save to localStorage if user is not logged in
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      const { totalQuantity, totalAmount } = updateCartSummary(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;

      if (state.userId) {
        axios.post("http://localhost:8080/api/cart/update", { userId: state.userId, cart: state.items });
      } else {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      if (state.userId) {
        axios.post("http://localhost:8080/api/cart/clear", { userId: state.userId });
      }
      localStorage.removeItem("cart");
    },

    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;

      const existingItem = state.items.find(item => item.id === id);
      if (existingItem && quantity > 0 && quantity <= existingItem.stock) {
        existingItem.quantity = quantity;
      }

      const { totalQuantity, totalAmount } = updateCartSummary(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;

      if (state.userId) {
        axios.post("http://localhost:8080/api/cart/update", { userId: state.userId, cart: state.items });
      } else {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    setUser(state, action) {
      state.userId = action.payload;
    },

    async syncCartWithDatabase(state, action) {
      const userId = action.payload;
      if (!userId) return;

      try {
        // Fetch user cart from database
        const { data } = await axios.get(`http://localhost:8080/api/cart/${userId}`);
        const userCart = data.cart || [];

        // Merge localStorage cart with database cart
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        const mergedCart = mergeCarts(userCart, localCart);

        // Save the merged cart to state and database
        state.items = mergedCart;
        const { totalQuantity, totalAmount } = updateCartSummary(mergedCart);
        state.totalQuantity = totalQuantity;
        state.totalAmount = totalAmount;

        await axios.post("http://localhost:8080/api/cart/update", { userId, cart: mergedCart });

        // Clear localStorage cart after merging
        localStorage.removeItem("cart");
      } catch (error) {
        console.error("Error syncing cart with database:", error);
      }
    }
  }
});

// Merge localStorage and database cart
const mergeCarts = (userCart, localCart) => {
  const mergedCart = [...userCart];

  localCart.forEach(localItem => {
    const existingItem = mergedCart.find(item => item.id === localItem.id);
    if (existingItem) {
      existingItem.quantity += localItem.quantity;
    } else {
      mergedCart.push(localItem);
    }
  });

  return mergedCart;
};

// Export actions and reducer
export const { addToCart, removeFromCart, clearCart, updateItemQuantity, setUser, syncCartWithDatabase } = cartSlice.actions;
export default cartSlice.reducer;
