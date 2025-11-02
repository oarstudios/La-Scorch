import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as feedbackAPI from "../Feedback/feedbackAPI";

export const createFeedback = createAsyncThunk(
  "feedback/createFeedback",
  async (feedbackData, thunkAPI) => {
    try {
      return await feedbackAPI.createFeedbackAPI(feedbackData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const fetchUserFeedbacks = createAsyncThunk(
  "feedback/fetchUserFeedbacks",
  async (userId, thunkAPI) => {
    try {
      return await feedbackAPI.fetchUserFeedbacksAPI(userId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const deleteFeedback = createAsyncThunk(
  "feedback/deleteFeedback",
  async (id, thunkAPI) => {
    try {
      return await feedbackAPI.deleteFeedbackAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// New thunk to fetch all feedbacks
export const fetchAllFeedbacks = createAsyncThunk(
  "feedback/fetchAllFeedbacks",
  async (_, thunkAPI) => {
    try {
      return await feedbackAPI.fetchAllFeedbacksAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbacks: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetFeedbackState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.feedbacks.push(action.payload.feedback);
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(fetchUserFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchUserFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = state.feedbacks.filter(fb => fb._id !== action.meta.arg);
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchAllFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetFeedbackState } = feedbackSlice.actions;
export default feedbackSlice.reducer;
