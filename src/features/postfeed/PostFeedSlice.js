// PostFeedSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSubRedditPosts } from "../../reddit/redditOfficialApi.js";
import { selectAuthToken } from "../auth/RedditAuthSlice.js";

// Async thunk to fetch posts for a given subreddit and optional after cursor
export const fetchPosts = createAsyncThunk(
  "postFeed/fetchPosts",
  async ({ subreddit, after = null }, { getState, rejectWithValue }) => {
    const token = selectAuthToken(getState());

    console.log("Fetching: ", subreddit)

    try {
      const { posts, nextPage } = await getSubRedditPosts(token, subreddit, after);
      return { subreddit, posts, nextPage };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const postFeedSlice = createSlice({
  name: "postFeed",
  initialState: {
    feeds: {
      // Each feed will look like:
      // popular: { pages: [], afterTokens: [], currentPageIndex: 0, loading: false, error: null }
    },
  },
  reducers: {
    // Navigate backward
    prevPage: (state, action) => {
      const { subreddit } = action.payload;
      if (state.feeds[subreddit]?.currentPageIndex > 0) {
        state.feeds[subreddit].currentPageIndex -= 1;
      }
    },
    // Navigate forward (increments page index without fetching, assumes page is already cached)
    nextPageLocal: (state, action) => {
      const { subreddit } = action.payload;
      const feed = state.feeds[subreddit];
      if (feed && feed.currentPageIndex < feed.pages.length - 1) {
        feed.currentPageIndex += 1;
      }
    },
    // Optional: reset feed when switching subreddits
    resetFeed: (state, action) => {
      const { subreddit } = action.payload;
      state.feeds[subreddit] = { pages: [], afterTokens: [], currentPageIndex: 0, loading: false, error: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        const { subreddit } = action.meta.arg;
        if (!state.feeds[subreddit]) {
          state.feeds[subreddit] = { pages: [], afterTokens: [], currentPageIndex: 0, loading: true, error: null };
        } else {
          state.feeds[subreddit].loading = true;
          state.feeds[subreddit].error = null;
        }
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const { subreddit, posts, nextPage } = action.payload;
        const feed = state.feeds[subreddit];

        feed.pages.push(posts);          // append new page
        feed.afterTokens.push(nextPage); // store after token for next fetch
        feed.currentPageIndex = feed.pages.length - 1;
        feed.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        const { subreddit } = action.meta.arg;
        state.feeds[subreddit].loading = false;
        state.feeds[subreddit].error = action.payload || action.error.message;
      });
  },
});


// Select feed object for a specific subreddit
const selectFeed = (subredditName) => (state) =>
  state.postFeed.feeds[subredditName] || {};

// Select posts for the current page
const selectCurrentPosts = (subredditName) => (state) => {
  const feed = state.postFeed.feeds[subredditName] || {};
  const currentPageIndex = feed.currentPageIndex ?? 0;
  const pages = feed.pages ?? [];
  return pages[currentPageIndex] || [];
};

// Select pagination info
const selectPagination = (subredditName) => (state) => {
  const feed = state.postFeed.feeds[subredditName] || {};
  return {
    currentPageIndex: feed.currentPageIndex ?? 0,
    afterTokens: feed.afterTokens ?? [],
    loading: feed.loading ?? false,
    error: feed.error ?? null,
  };
};



export const { prevPage, nextPageLocal, resetFeed } = postFeedSlice.actions;
export { selectFeed, selectCurrentPosts, selectPagination }
export default postFeedSlice.reducer;
