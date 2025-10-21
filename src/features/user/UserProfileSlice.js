import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "../../reddit/redditOfficialApi";
import { selectAuthToken } from "../auth/RedditAuthSlice";

// Async thunk
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    //console.log("About to get token")
    const token = selectAuthToken(getState());
    //console.log("User Profile Token value:", token)
    try {
      //throw "simulated error";
      const data = await getUserProfile(token);

      //await new Promise((resolve) => setTimeout(resolve, 2500));

      return {
        id: data.id,
        name: data.name,
        avatar: data.avatar,
        karma: data.karma,
        bio: data.bio
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
export const selectUserProfileLoading = (state) => state.userProfile.loading;
export const selectUserProfileError = (state) => state.userProfile.error;
export default userProfileSlice.reducer;
