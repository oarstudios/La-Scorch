import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as userAPI from "./UserAPI";

export const getUserById = createAsyncThunk("user/getById", async (id, thunkAPI) => {
  try {
    return await userAPI.getUserByIdAPI(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const getAllUsers = createAsyncThunk("user/getAll", async (_, thunkAPI) => {
  try {
    return await userAPI.getAllUsersAPI();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const updateUser = createAsyncThunk("user/update", async ({ id, userData }, thunkAPI) => {
  try {
    return await userAPI.updateUserAPI({ id, userData });
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const deleteAddress = createAsyncThunk(
  "user/deleteAddress",
  async ({ id, addressIndex }, thunkAPI) => {
    try {
      const userRes = await userAPI.getUserByIdAPI(id);
      let addresses = userRes.addresses || [];
      addresses.splice(addressIndex, 1);
      const updatedUser = { ...userRes, addresses };
      return await userAPI.updateUserAPI({ id, userData: updatedUser });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "user/addToCart",
  async ({ userId, productId, quantity }, thunkAPI) => {
    try {
      return await userAPI.addToCartAPI({ id: userId, productId, quantity });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    usersList: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updated = action.payload;
        const index = state.usersList.findIndex(user => user._id === updated._id);
        if (index !== -1) {
          state.usersList = [
            ...state.usersList.slice(0, index),
            updated,
            ...state.usersList.slice(index + 1)
          ];
        }
        if (state.currentUser && state.currentUser._id === updated._id) {
          state.currentUser = { ...updated };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updated = action.payload;
        const index = state.usersList.findIndex(user => user._id === updated._id);
        if (index !== -1) {
          state.usersList = [
            ...state.usersList.slice(0, index),
            updated,
            ...state.usersList.slice(index + 1)
          ];
        }
        if (state.currentUser && state.currentUser._id === updated._id) {
          state.currentUser = { ...updated };
        }
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
       // Add to Cart cases
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Optionally update currentUser or usersList state here if it returns updated user/cart
        state.currentUser = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  }
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
