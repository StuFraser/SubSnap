// PostFeed.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, prevPage, nextPageLocal, resetFeed } from "./PostFeedSlice.js"
import "./PostFeed.css";
import Post from "../post/Post.jsx";
import Pagination from "../../layout/pagination/Pagination.jsx";
import Spinner from "../../layout/spinner/Spinner.jsx";

export default function PostFeed({ type }) {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.postFeed.feeds[type]);
  const loading = feed?.loading ?? false;
  const error = feed?.error ?? null;
  const currentPageIndex = feed?.currentPageIndex ?? 0;
  const pages = feed?.pages ?? [];
  const afterTokens = feed?.afterTokens ?? [];

  // Determine current posts to display
  const currentPosts = pages[currentPageIndex] || [];

  // Map feed types to subreddit names
  const getSubreddit = (type) => {
    switch (type) {
      case "favorites": return "javascript+reactjs";
      case "popular": return "popular";
      case "new": return "new";
      default: return "all";
    }
  };

  const subreddit = getSubreddit(type);

  // Fetch first page on mount or when feed type changes
  useEffect(() => {
    dispatch(resetFeed({ subreddit }));
    dispatch(fetchPosts({ subreddit }));
  }, [subreddit, dispatch]);

  const handleNext = () => {
    // If next page already cached, just advance index
    if (currentPageIndex < pages.length - 1) {
      dispatch(nextPageLocal({ subreddit }));
    } else {
      // Otherwise fetch the next page using the last after token
      const after = afterTokens[currentPageIndex] ?? null;
      dispatch(fetchPosts({ subreddit, after }));
    }
  };

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      dispatch(prevPage({ subreddit }));
    }
  };

  if (loading) return (
    <div className="post-loading">
      <p>Loading posts...</p>
      <Spinner />
    </div>
  );

  if (error) return (
<div className="post-error">
  <p>Error loading posts: {error}</p>;
  <button>Retry</button>
</div>
  ) 

  return (
    <>
      <div className="post-feed">
        <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Posts</h2>
        <ul>
          {currentPosts.map((post) => (
            <li key={post.id}>
              <Post post={post} />
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        onNextClick={handleNext}
        onPrevClick={handlePrev}
        before={currentPageIndex > 0}
        after={afterTokens[currentPageIndex] != null}
        page={currentPageIndex + 1}
      />
    </>
  );
}
