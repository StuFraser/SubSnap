// PostFeed.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPosts, prevPage, nextPageLocal, resetFeed, selectCurrentPosts, selectPagination } from "./PostFeedSlice.js";
import Post from "../post/Post.jsx";
import Pagination from "../../layout/pagination/Pagination.jsx";
import Spinner from "../../layout/spinner/Spinner.jsx";
import "./PostFeed.css";

const PostFeed = () => {
  const { subredditName } = useParams();
  const subreddit = subredditName || "all"; // default subreddit

  const dispatch = useDispatch();

  // Select feed data
  const posts = useSelector(selectCurrentPosts(subreddit));
  const { currentPageIndex, afterTokens, loading, error } = useSelector(selectPagination(subreddit));

  // Fetch first page when subreddit changes
  useEffect(() => {

    console.log("Dispatch:", subreddit)

    dispatch(resetFeed({ subreddit }));
    dispatch(fetchPosts({ subreddit }));
  }, [subreddit, dispatch]);

  const handleNext = () => {
    if (currentPageIndex < posts.length - 1) {
      dispatch(nextPageLocal({ subreddit }));
    } else {
      const after = afterTokens[currentPageIndex] ?? null;
      dispatch(fetchPosts({ subreddit, after }));
    }
  };

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      dispatch(prevPage({ subreddit }));
    }
  };

  if (loading) {
    return (
      <div className="post-loading">
        <p>Loading posts...</p>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-error">
        <p>Error loading posts: {error}</p>
        <button onClick={() => dispatch(fetchPosts({ subreddit }))}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <div className="post-feed">
        <h2>{`r/${subreddit}`}</h2>
        <ul>
          {posts.map((post) => (
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
};

export default PostFeed;
