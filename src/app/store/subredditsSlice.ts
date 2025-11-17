import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchSubscribedSubreddits, fetchSearchSubreddits } from "@/api/subredditList";
import type { Subreddit } from '@/shared/models/Subreddit'; // Use your actual Subreddit type import
import type { RootState } from '../store';


interface SubredditState {
  subscribedList: Subreddit[];
  subscribedStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  subscribedError: string | null;
  searchResults: Subreddit[];
  searchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  searchError: string | null;
}
const initialState: SubredditState = {
  subscribedList: [],
  subscribedStatus: 'idle',
  subscribedError: null,
  
  searchResults: [],
  searchStatus: 'idle',
  searchError: null,
};


// --- ASYNC THUNKS ---
export const fetchSubscribed = createAsyncThunk<Subreddit[], void, { rejectValue: string }>(
  'subreddits/fetchSubscribed',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchSubscribedSubreddits();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch subscribed subreddits.");
    }
  }
);


export const searchSubreddits = createAsyncThunk<Subreddit[], string, { rejectValue: string }>(
  'subreddits/search',
  async (query, { rejectWithValue }) => {
    if (!query.trim()) {
        return []; 
    }
    try {
      return await fetchSearchSubreddits(query);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : `Failed to search for subreddits: ${query}`);
    }
  }
);


// --- SLICE DEFINITION ---

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchStatus = 'idle';
      state.searchError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- HANDLERS FOR fetchSubscribed (My Subreddits) ---
      .addCase(fetchSubscribed.pending, (state) => {
        state.subscribedStatus = 'loading';
        state.subscribedError = null;
      })
      .addCase(fetchSubscribed.fulfilled, (state, action: PayloadAction<Subreddit[]>) => {
        state.subscribedStatus = 'succeeded';
        state.subscribedList = action.payload;
      })
      .addCase(fetchSubscribed.rejected, (state, action) => {
        state.subscribedStatus = 'failed';
        state.subscribedError = action.payload as string || 'Unknown subscribed fetch error.';
        state.subscribedList = [];
      })

      // --- HANDLERS FOR searchSubreddits (Search Flow) ---
      .addCase(searchSubreddits.pending, (state) => {
        state.searchStatus = 'loading';
        state.searchError = null;
        state.searchResults = []; 
      })
      .addCase(searchSubreddits.fulfilled, (state, action: PayloadAction<Subreddit[]>) => {
        state.searchStatus = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchSubreddits.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.searchError = action.payload as string || 'Unknown search error.';
      });
  },
});

export const { clearSearchResults } = subredditsSlice.actions;
export const selectSubredditState = (state: RootState) => state.subredditListings;
export default subredditsSlice.reducer;