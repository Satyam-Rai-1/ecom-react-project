import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import themeReducer from './features/themeSlice';
import productsReducer from './features/productsSlice';
import categoriesReducer from './features/categoriesSlice';
import brandsReducer from './features/brandsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    products: productsReducer,
    categories: categoriesReducer,
    brands: brandsReducer, 

  },
});

export default store;