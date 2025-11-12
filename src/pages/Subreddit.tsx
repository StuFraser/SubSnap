import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsPage, selectPostsState, clearPosts } from "@/app/store/subredditPostSlice";
import type { AppDispatch } from "@/app/store";
import { Pager } from "@/components/ui/pager/pager";

interface SubredditProps {
  name: string; // e.g., "reactjs"
}

const Subreddit: React.FC<SubredditProps> = ({ name }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, after, currentPage, isLoading, error } = useSelector(selectPostsState);

  // Fetch first page on mount
  useEffect(() => {
    dispatch(fetchPostsPage({ subreddit: name, page: 1 }));
  }, [dispatch, name]);

  const handleNext = () => {
    if (!after) return;
    dispatch(fetchPostsPage({ subreddit: name, after, page: currentPage + 1 }));
  };

  const handlePrev = () => {
    if (currentPage <= 1) return;
    // Resetting 'after' to undefined for previous page; slice fetches fresh
    dispatch(fetchPostsPage({ subreddit: name, page: currentPage - 1 }));
  };

  return (
    <div>
      <h2>/r/{name}</h2>

      {isLoading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={post.url} target="_blank" rel="noopener noreferrer">{post.title}</a>
            <p>by {post.author} | {post.score} points | {post.commentCount} comments</p>
          </li>
        ))}
      </ul>

      <Pager
        currentPage={currentPage}
        hasNext={!!after}
        onNext={handleNext}
        onPrev={handlePrev}
        onRefresh={() => {
          dispatch(clearPosts());
          dispatch(fetchPostsPage({ subreddit: name, page: 1 }));
        }}
        redditUrl={`https://www.reddit.com/r/${name}/new`}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Subreddit;
