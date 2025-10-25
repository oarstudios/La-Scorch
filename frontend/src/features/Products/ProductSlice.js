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

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get single product
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

      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.product);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.product;
        const index = state.products.findIndex((p) => p._id === updated._id);

        if (index !== -1) {
          state.products[index] = updated;
        } else {
          state.products.push(updated);
        }

        state.currentProduct = updated;
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Archive product
      .addCase(archiveProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(archiveProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
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
