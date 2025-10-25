// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./AuthTypes";
import * as authAPI from "./AuthAPI";

// Thunks
export const signupUser = createAsyncThunk(types.SIGNUP_REQUEST, async (userData, thunkAPI) => {
  try {
    return await authAPI.signup(userData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const loginUser = createAsyncThunk(types.LOGIN_REQUEST, async (userData, thunkAPI) => {
  try {
    return await authAPI.login(userData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// src/features/auth/authSlice.js
export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, thunkAPI) => {
  try {
    const res = await fetch('http://localhost:4001/api/users/me', {
      method: 'GET',
      credentials: 'include', // send cookies
    });

    if (!res.ok) throw new Error('Not authenticated');

    const data = await res.json();
    return data.user; // assuming API returns { user: {...} }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});


export const logoutUser = createAsyncThunk(types.LOGOUT, async (_, thunkAPI) => {
  try {
    return await authAPI.logout();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
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
    // Signup
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
      });

    // Login
    builder
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
      });

    // Logout
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });

    // Check auth
  builder
    .addCase(checkAuth.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(checkAuth.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export default authSlice.reducer;
