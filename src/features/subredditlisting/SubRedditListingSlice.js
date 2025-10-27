// src/layout/subredditlisting/SubRedditListingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchSubReddits } from "../../reddit/redditOfficialApi";
import { selectAuthToken } from "../auth/RedditAuthSlice.js";

// Async thunk for searching subreddits
export const fetchSubredditsBySearch = createAsyncThunk(
  "subreddits/fetchBySearch",
  
  async (searchTerm,  { getState, rejectWithValue } ) => {
    //console.log("About to get the token")
    const token = selectAuthToken(getState());
    //console.log("Token: ", token);
    try {
      //console.log("about to make request")
      const results = await searchSubReddits(token, searchTerm);
      return results;
    } catch (err) {
      //console.log("Got an error in response")
      return rejectWithValue(err.message);
    }
  }
);

const subredditSlice = createSlice({
  name: "subreddits",
  initialState: {
    results: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubredditsBySearch.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSubredditsBySearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchSubredditsBySearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export const selectSubredditResults = (state) => state.subreddits.results;
export const selectSubredditStatus = (state) => state.subreddits.status;
export const selectSubredditError = (state) => state.subreddits.error;

export default subredditSlice.reducer;
