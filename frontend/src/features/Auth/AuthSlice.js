// src/features/Auth/AuthSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "./AuthAPI";

// User signup
export const signupUser = createAsyncThunk("auth/signup", async (userData, thunkAPI) => {
  try {
    return await authAPI.signup(userData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// User login
export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    return await authAPI.login(userData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// User logout
export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authAPI.logout();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// Get current user via API
export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async (_, thunkAPI) => {
  try {
    return await authAPI.getCurrentUserAPI();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// Check authentication status (used in App.js)
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, thunkAPI) => {
  try {
    const user = await authAPI.getCurrentUserAPI();
    return user;
  } catch (err) {
    return thunkAPI.rejectWithValue("Not authenticated");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
