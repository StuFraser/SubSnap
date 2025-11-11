// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import subredditPostsReducer from "./store/subredditPostSlice";

const store = configureStore({
  reducer: {
    subredditPosts: subredditPostsReducer,
  },
});


export default store;   
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
