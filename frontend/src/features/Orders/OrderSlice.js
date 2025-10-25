import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchOrdersAPI,
  fetchOrderByIdAPI,
  createOrderAPI,
  updateOrderAPI,
  deleteOrderAPI,
} from "../Orders/OrdersAPI";

export const fetchOrders = createAsyncThunk("orders/fetchAll", async (_, thunkAPI) => {
  try {
    return await fetchOrdersAPI();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const createOrder = createAsyncThunk("orders/create", async (formData, thunkAPI) => {
  try {
    return await createOrderAPI(formData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const updateOrder = createAsyncThunk("orders/update", async ({ id, data }, thunkAPI) => {
  try {
    return await updateOrderAPI(id, data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const deleteOrder = createAsyncThunk("orders/delete", async (id, thunkAPI) => {
  try {
    return await deleteOrderAPI(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const idx = state.orders.findIndex(o => o._id === action.payload._id);
        if (idx > -1) state.orders[idx] = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(o => o._id !== action.meta.arg);
      });
  }
});

export default orderSlice.reducer;
