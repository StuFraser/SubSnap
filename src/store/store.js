import { configureStore } from "@reduxjs/toolkit";
import redditAuthReducer from "../reddit/RedditAuthSlice";

export default configureStore({
  reducer: {
    redditAuth: redditAuthReducer,
  },
});
