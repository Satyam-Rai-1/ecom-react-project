import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch brands from API
export const fetchBrands = createAsyncThunk("brands/fetchBrands",async () => {
    const response = await axios.get("http://localhost:8080/api/brands"); // Adjust API endpoint
    return response.data.data; // Assuming the data is inside a `data` key
  }
);

const brandsSlice = createSlice({
  name: "brands",
  initialState: {
    brands: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default brandsSlice.reducer;
