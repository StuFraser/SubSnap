import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { fetchSubredditPost } from "@/api/subredditPost";
import type { Post } from "@/shared/models/Post";
import type { RootState } from "../store";

interface PostsState {
  posts: Post[];
  after: string | null;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  after: null,
  currentPage: 1,
  isLoading: false,
  error: null,
};

export const fetchPostsPage = createAsyncThunk<
  { posts: Post[]; after: string | null; page: number },
  { subreddit: string; after?: string | null; page: number },
  { state: RootState }
>(
  "subredditPosts/fetchPostsPage",
  async ({ subreddit, after = null, page }, { rejectWithValue }) => {
    try {
      const { posts, after: nextAfter } = await fetchSubredditPost(subreddit, after || "");
      return { posts, after: nextAfter, page };
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
      state.posts = [];
      state.after = null;
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
        state.posts = action.payload.posts;
        state.after = action.payload.after;
        state.currentPage = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchPostsPage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Unknown error";
      });
  },
});

export const { goToPage, clearPosts } = subredditPostsSlice.actions;

export const selectPostsState = (state: RootState) => state.subredditPosts;
export const selectPosts = (state: RootState) => state.subredditPosts.posts;

export default subredditPostsSlice.reducer;
