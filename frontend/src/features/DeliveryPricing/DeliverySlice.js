import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchLocationsAPI,
  createLocationAPI,
  updateLocationAPI,
  deleteLocationAPI
} from "../DeliveryPricing/DeliveryAPI";

export const fetchLocations = createAsyncThunk("delivery/fetchAll", async (search, thunkAPI) => {
  try {
    return await fetchLocationsAPI(search);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const createLocation = createAsyncThunk("delivery/create", async (data, thunkAPI) => {
  try {
    return await createLocationAPI(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const updateLocation = createAsyncThunk("delivery/update", async ({ id, data }, thunkAPI) => {
  try {
    return await updateLocationAPI(id, data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const deleteLocation = createAsyncThunk("delivery/delete", async (id, thunkAPI) => {
  try {
    return await deleteLocationAPI(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

const deliverySlice = createSlice({
  name: "delivery",
  initialState: {
    locations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.locations.unshift(action.payload);
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        const idx = state.locations.findIndex(a => a._id === action.payload._id);
        if (idx > -1) state.locations[idx] = action.payload;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.locations = state.locations.filter(a => a._id !== action.meta.arg);
      });
  }
});

export default deliverySlice.reducer;
