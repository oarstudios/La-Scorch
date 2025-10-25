import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCreativesAPI,
  createCreativesAPI,
  updateCreativeAPI,
  deleteCreativeAPI
} from "./CreativesAPI";

// Thunks
export const fetchCreatives = createAsyncThunk(
  "creatives/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await fetchCreativesAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const createCreatives = createAsyncThunk(
  "creatives/create",
  async (formData, thunkAPI) => {
    try {
      return await createCreativesAPI(formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const updateCreative = createAsyncThunk(
  "creatives/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await updateCreativeAPI(id, formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const deleteCreative = createAsyncThunk(
  "creatives/delete",
  async (id, thunkAPI) => {
    try {
      return await deleteCreativeAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const creativesSlice = createSlice({
  name: "creatives",
  initialState: {
    creatives: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreatives.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreatives.fulfilled, (state, action) => {
        state.loading = false;
        // .data if your backend sends: {success, data}
        state.creatives = action.payload.data ? action.payload.data : action.payload;
      })
      .addCase(fetchCreatives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCreatives.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCreatives.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCreatives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCreative.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCreative.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCreative.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCreative.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCreative.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCreative.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default creativesSlice.reducer;
