import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authToken: null,
  refreshToken: null,
  expiry: null,
  isAuthenticated: false,
};

const redditAuthSlice = createSlice({
  name: "redditAuth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { authToken, refreshToken, expiry } = action.payload;
      state.authToken = authToken;
      state.refreshToken = refreshToken;
      state.expiry = expiry;
      state.isAuthenticated = true;
    },

    clearToken: (state) => {
      state.authToken = null;
      state.refreshToken = null;
      state.expiry = null;
      state.isAuthenticated = false;
    },

    updateToken: (state, action) => {
      const { authToken, expiry } = action.payload;
      state.authToken = authToken;
      state.expiry = expiry;
    },
  },
});

// Export actions
export const { setToken, clearToken, updateToken } = redditAuthSlice.actions;

// Export selector helpers
export const selectAuthToken = (state) => state.redditAuth.authToken;
export const selectIsAuthenticated = (state) =>
  state.redditAuth.isAuthenticated;

// Export reducer
export default redditAuthSlice.reducer;
