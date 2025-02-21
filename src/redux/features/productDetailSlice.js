import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch product by slug
export const fetchProductBySlug = createAsyncThunk(
  'products/fetchProductBySlug',
  async (slug) => {
    const response = await axios.get(`http://localhost:8080/api/products/${slug}`);
    // console.log("response",response.data.data);
    
    return response.data.data; // Assuming the API returns product data
  }
);

const productDetailSlice = createSlice({
  name: 'products',
  initialState: {
    product: {},
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductBySlug.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productDetailSlice.reducer;
