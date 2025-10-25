import React from "react";
import { useSelector } from "react-redux";
import "./SubRedditListing.css";

export default function SubRedditListing({ title }) {
  const { subreddits, status, error } = useSelector(
    (state) => state.subredditListing
  );

  if (status === "loading") return <div className="loading">Loading...</div>;
  if (status === "failed") return <div className="error">{error}</div>;
  if (!subreddits.length) return <div className="empty">No subreddits found.</div>;

  return (
    <div className="subreddit-listing">
      {title && <h2>{title}</h2>}
      {subreddits.map((sr) => (
        <div
          key={sr.id}
          className="subreddit-item"
          onClick={() => (window.location.href = `/r/${sr.display_name}`)}
        >
          <img
            src={sr.icon_img || "/default-subreddit-icon.png"}
            alt={sr.display_name}
            className="subreddit-icon"
          />
          <div className="subreddit-info">
            <span className="subreddit-name">r/{sr.display_name}</span>
            <span className="subreddit-desc">{sr.public_description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
