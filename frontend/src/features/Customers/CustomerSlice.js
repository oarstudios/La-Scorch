import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCustomersAPI } from "../Customers/CustomerAPI";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await fetchCustomersAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default customerSlice.reducer;
