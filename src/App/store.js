import { configureStore } from "@reduxjs/toolkit";
import redditAuthReducer from "../features/auth/RedditAuthSlice";
import userProfileReducer from "../features/user/UserProfileSlice";
import postFeedReducer from "../features/postfeed/PostFeedSlice.js";
import subRedditListingReducer from "../features/subredditlisting/SubRedditListingSlice.js" 

export const store = configureStore({
  reducer: {
    redditAuth: redditAuthReducer,
    userProfile: userProfileReducer,
    postFeed: postFeedReducer,
    subreddits: subRedditListingReducer,
  },
});

export default store;
