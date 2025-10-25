import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCouponsAPI,
  createCouponAPI,
  updateCouponAPI,
  deleteCouponAPI,
} from "../Coupons/CouponsAPI";

// Thunks
export const fetchCoupons = createAsyncThunk("coupons/fetchAll", async (search, thunkAPI) => {
  try {
    return await fetchCouponsAPI(search);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const createCoupon = createAsyncThunk("coupons/create", async (data, thunkAPI) => {
  try {
    return await createCouponAPI(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const updateCoupon = createAsyncThunk("coupons/update", async ({ id, data }, thunkAPI) => {
  try {
    return await updateCouponAPI(id, data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const deleteCoupon = createAsyncThunk("coupons/delete", async (id, thunkAPI) => {
  try {
    return await deleteCouponAPI(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

const couponSlice = createSlice({
  name: "coupons",
  initialState: {
    coupons: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.coupons.unshift(action.payload);
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        const idx = state.coupons.findIndex(c => c._id === action.payload._id);
        if (idx > -1) state.coupons[idx] = action.payload;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter(c => c._id !== action.meta.arg);
      });
  }
});

export default couponSlice.reducer;
