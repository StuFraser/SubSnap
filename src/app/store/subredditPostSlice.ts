// src/store/subredditPostsSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { fetchSubredditPost } from "@/api/subredditPost";
import type { Post } from "@/shared/models/Post";
import type { RootState } from "../store"; // adjust path if needed

interface PostsState {
  pages: Record<number, Post[]>;             // posts per page
  afterTokens: Record<number, string | null>; // after token to fetch next page
  currentPage: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  pages: {},
  afterTokens: {},
  currentPage: 1,
  isLoading: false,
  error: null,
};

// --- Thunk to fetch a specific page ---
export const fetchPostsPage = createAsyncThunk<
  { page: number; posts: Post[]; after: string | null },
  { subreddit: string; page: number },
  { state: RootState }
>(
  "subredditPosts/fetchPostsPage",
  async ({ subreddit, page }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const afterTokens = state.subredditPosts.afterTokens;
      const after = afterTokens[page - 1] || ""; // previous page's after token, empty for page 1

      const posts = await fetchSubredditPost(subreddit, after);

      // Get the 'after' token from Reddit API (use last post's fullname)
      // Note: Reddit API returns data.data.after in the response, we could modify fetchSubredditPost to return it
      const nextAfter = posts.length > 0 ? posts[posts.length - 1].id : null;

      return { page, posts, after: nextAfter };
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch posts");
    }
  }
);

const subredditPostsSlice = createSlice({
  name: "subredditPosts",
  initialState,
  reducers: {
    goToPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    clearPosts(state) {
      state.pages = {};
      state.afterTokens = {};
      state.currentPage = 1;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsPage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostsPage.fulfilled, (state, action) => {
        const { page, posts, after } = action.payload;
        state.pages[page] = posts;
        state.afterTokens[page] = after;
        state.currentPage = page;
        state.isLoading = false;
      })
      .addCase(fetchPostsPage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Unknown error";
      });
  },
});

export const { goToPage, clearPosts } = subredditPostsSlice.actions;

export const selectPostsState = (state: RootState) => state.subredditPosts;

export default subredditPostsSlice.reducer;
