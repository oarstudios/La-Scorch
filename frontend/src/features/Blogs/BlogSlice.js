import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBlogsAPI,
  createBlogAPI,
  updateBlogAPI,
  deleteBlogAPI,
} from "../Blogs/BlogAPI";

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await fetchBlogsAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const createBlog = createAsyncThunk(
  "blogs/create",
  async (formData, thunkAPI) => {
    try {
      return await createBlogAPI(formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await updateBlogAPI(id, formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/delete",
  async (id, thunkAPI) => {
    try {
      return await deleteBlogAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.unshift(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const idx = state.blogs.findIndex(b => b._id === action.payload._id);
        if (idx > -1) state.blogs[idx] = action.payload;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(b => b._id !== action.meta.arg);
      });
  }
});

export default blogSlice.reducer;
