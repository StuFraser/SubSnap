// src/pages/Subreddit.tsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsPage, selectPostsState } from "@/app/store/subredditPostSlice";  
import type { AppDispatch } from "@/app/store";

const Subreddit: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pages, currentPage, isLoading, error } = useSelector(selectPostsState);

  useEffect(() => {
    // On mount, fetch first page of "popular" subreddit
    dispatch(fetchPostsPage({ subreddit: "popular", page: 1 }));
  }, [dispatch]);

  const posts = pages[currentPage] || [];

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Popular Posts</h1>

      {isLoading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "1rem" }}>
            <strong>{post.title}</strong> by {post.author} | {post.score} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subreddit;
