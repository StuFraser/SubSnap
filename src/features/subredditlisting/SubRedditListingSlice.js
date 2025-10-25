import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Generic thunk for searching subreddits
export const fetchSubredditsBySearch = createAsyncThunk(
  "subreddit/fetchBySearch",
  async (term, { rejectWithValue }) => {
    try {
      const data = await apiFetch(`/subreddits/search?q=${term}&limit=20`);
      return data.data.children.map((child) => child.data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Generic thunk for fetching user's subscriptions
export const fetchUserSubscriptions = createAsyncThunk(
  "subreddit/fetchSubscriptions",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiFetch(`/subreddits/mine/subscriber`);
      return data.data.children.map((child) => child.data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  subreddits: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const subRedditListingSlice = createSlice({
  name: "subredditListing",
  initialState,
  reducers: {
    clearSubreddits: (state) => {
      state.subreddits = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchSubredditsBySearch
      .addCase(fetchSubredditsBySearch.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSubredditsBySearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subreddits = action.payload;
      })
      .addCase(fetchSubredditsBySearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // fetchUserSubscriptions
      .addCase(fetchUserSubscriptions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserSubscriptions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subreddits = action.payload;
      })
      .addCase(fetchUserSubscriptions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearSubreddits } = subRedditListingSlice.actions;
export default subRedditListingSlice.reducer;
