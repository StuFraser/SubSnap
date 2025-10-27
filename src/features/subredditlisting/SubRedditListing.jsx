import React from "react";
import { useSelector } from "react-redux";
import {
  selectSubredditResults,
  selectSubredditStatus,
  selectSubredditError,
} from "./SubRedditListingSlice";
import "./SubRedditListing.css";
import Subreddit from "../subreddit/Subreddit"

const SubRedditListing = () => {
  const subreddits = useSelector(selectSubredditResults);
  const status = useSelector(selectSubredditStatus);
  const error = useSelector(selectSubredditError);

  if (status === "loading") return <div className="loading">Searching...</div>;
  if (status === "failed") return <div className="error">Error: {error}</div>;
  if (!subreddits?.length) return <div>No results found.</div>;

  return (
    <div className="subreddit-list">
      {subreddits.map((s) => (
        <Subreddit key={s.id} subreddit={s} />
      ))}
    </div>
  );
}

export default SubRedditListing;
