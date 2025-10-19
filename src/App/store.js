import { configureStore } from "@reduxjs/toolkit";
import redditAuthReducer from "../features/auth/RedditAuthSlice";
import userProfileReducer from "../features/user/UserProfileSlice";

export const store = configureStore({
  reducer: {
    redditAuth: redditAuthReducer,
    userProfile: userProfileReducer,
  },
});

export default store;
