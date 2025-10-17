import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthToken } from "../reddit/RedditAuthSlice";
import { redditFetch } from "../reddit/redditOAuth"; // Use our helper

export default function RedditPosts({ subreddit = "reactjs", limit = 10 }) {
  const token = useSelector(selectAuthToken);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await redditFetch(`/r/${subreddit}/hot?limit=${limit}`, token);
        setPosts(data.data.children.map((p) => p.data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token, subreddit, limit]);

  if (!token)
    return (
      <div className="p-4 text-center text-gray-600">
        Please log in with Reddit first.
      </div>
    );

  if (loading)
    return (
      <div className="p-4 text-center text-gray-600">Loading posts...</div>
    );

  if (error)
    return (
      <div className="p-4 text-center text-red-500">
        Error fetching posts: {error}
      </div>
    );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">r/{subreddit} — Hot Posts</h2>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li
            key={post.id}
            className="p-3 bg-white rounded-2xl shadow hover:shadow-md transition"
          >
            <a
              href={`https://reddit.com${post.permalink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              {post.title}
            </a>
            <div className="text-sm text-gray-500">
              👍 {post.ups} — 💬 {post.num_comments} — by {post.author}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
