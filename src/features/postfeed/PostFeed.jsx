// PostFeed.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSubRedditPosts } from "../../reddit/redditOfficialApi.js"
import { selectAuthToken } from "../auth/RedditAuthSlice.js";
import "./PostFeed.css";

export default function PostFeed({ type }) {
  const token = useSelector(selectAuthToken); // or however you store it
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let subreddit;

      switch (type) {
        case "default":
          subreddit = "default"; // example: combine favorite subreddits
          break;
        case "favorites":
          subreddit = "javascript+reactjs"; // example: combine favorite subreddits
          break;
        case "popular":
          subreddit = "popular";
          break;
        case "new":
          subreddit = "new";
          break;
        default:
          subreddit = "all";
      }

      try {
        const { posts } = await getSubRedditPosts(token, subreddit);
        setPosts(posts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [type, token]);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="post-feed">
      <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>By {post.author} | Score: {post.score}</p>
            <a href={post.url} target="_blank" rel="noopener noreferrer">View Post</a>
          </li>
        ))}
      </ul>
    </div>
  );
}