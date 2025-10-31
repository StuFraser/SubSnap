import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authToken: null,
  expiry: null,
  isAuthenticated: false,
  initialized: false,
};

const redditAuthSlice = createSlice({
  name: "redditAuth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { authToken, expiry } = action.payload;
      state.authToken = authToken;
      state.expiry = expiry;
      state.isAuthenticated = true;
      state.initialized = true;
    },

    clearToken: (state) => {
      state.authToken = null;
      state.expiry = null;
      state.isAuthenticated = false;
    },

    updateToken: (state, action) => {
      const { expiry } = action.payload;
      state.expiry = expiry;
    },
  },
});

export const { setToken, clearToken, updateToken } = redditAuthSlice.actions;

export const selectAuthToken = (state) => state.redditAuth.authToken;
export const selectIsAuthenticated = (state) => state.redditAuth.isAuthenticated;
export const selectInitialized = (state) => state.redditAuth.initialized;
export const selectExpiry = (state) => state.redditAuth.expiry;

export default redditAuthSlice.reducer;
