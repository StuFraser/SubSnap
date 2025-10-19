import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "../../reddit/redditOfficialApi";

// Async thunk
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    const token = selectAuthToken(getState());
    try {
      const data = await getUserProfile(token);
      return {
        id: data.id,
        name: data.name,
        avatar: data.avatar || data.icon_img,
        karma: data.karma,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Slice
const initialState = 
    { profile: null, 
        loading: false, 
        error: null };

const userProfileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user";
      });
  },
});

export const { clearUser } = userProfileSlice.actions;
export const selectUserProfile = (state) => state.userProfile;
export default userProfileSlice.reducer;
