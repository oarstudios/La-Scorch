import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as productAPI from "../Products/ProductAPI";

// Thunks

export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      return await productAPI.fetchProducts();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/getById",
  async (id, thunkAPI) => {
    try {
      return await productAPI.fetchProductById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  "products/getByCategory",
  async (categoryId, thunkAPI) => {
    try {
      return await productAPI.fetchProductsByCategory(categoryId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || err.message
      );
    }
  }
);

export const getBestsellerProducts = createAsyncThunk(
  "products/getBestsellers",
  async (_, thunkAPI) => {
    try {
      return await productAPI.fetchBestsellerProducts();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await productAPI.createProductAPI(formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await productAPI.updateProductAPI(id, formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const archiveProduct = createAsyncThunk(
  "products/archive",
  async (id, thunkAPI) => {
    try {
      return await productAPI.archiveProductAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],           // all or category products
    bestsellerProducts: [],    // bestsellers
    currentProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all products (or category)
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get bestseller products
      .addCase(getBestsellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBestsellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.bestsellerProducts = action.payload;
      })
      .addCase(getBestsellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Other product actions
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts.push(action.payload.product);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.product;
        const index = state.allProducts.findIndex((p) => p._id === updated._id);
        if (index !== -1) {
          state.allProducts[index] = updated;
        } else {
          state.allProducts.push(updated);
        }
        state.currentProduct = updated;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(archiveProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(archiveProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = state.allProducts.filter(
          (p) => p._id !== action.payload.product._id
        );
      })
      .addCase(archiveProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
