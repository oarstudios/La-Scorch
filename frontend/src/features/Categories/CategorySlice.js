import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as categoryApi from "../Categories/CategoryAPI";

// Thunks
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => categoryApi.getCategories()
);

export const fetchCategoryById = createAsyncThunk(
  "category/fetchCategoryById",
  async (id) => categoryApi.getCategoryById(id)
);

export const createCategoryThunk = createAsyncThunk(
  "category/createCategory",
  async (data) => categoryApi.createCategory(data)
);

export const updateCategoryThunk = createAsyncThunk(
  "category/updateCategory",
  async ({ id, data }) => categoryApi.updateCategory(id, data)
);

export const deleteCategoryThunk = createAsyncThunk(
  "category/deleteCategory",
  async (id) => categoryApi.deleteCategory(id)
);

// Initial state
const initialState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch category by ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create category
      .addCase(createCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.unshift(action.payload); // Add new category to the front
      })
      .addCase(createCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update category
      .addCase(updateCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map((cat) =>
          cat._id === action.payload._id ? action.payload : cat
        );
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete category
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.meta.arg
        );
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
