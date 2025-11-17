// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import subredditPostsReducer from "./store/subredditPostSlice";
import subredditListReducer  from "./store/subredditsSlice";

const store = configureStore({
  reducer: {
    subredditPosts: subredditPostsReducer,
    subredditListings: subredditListReducer,
  },
});


export default store;   
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;