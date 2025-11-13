import React from "react";
import type { Post } from "@/shared/models/Post";
import "./Postcard.css";

interface PostcardProps {
  post: Post;
}

const Postcard: React.FC<PostcardProps> = ({ post }) => {
  return (
    <>
    <div className="post-card">
      {post.thumbnailUrl && (
        <img
          src={post.thumbnailUrl}
          alt="thumbnail"
          className="post-thumbnail"
        />
      )}

      <div className="post-content">
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="post-title"
        >
          {post.title} {post.over_18 && <span className="nsfw-tag">NSFW</span>}
        </a>

        <p className="post-meta">
          by {post.author} | {post.score} points | {post.commentCount} comments
        </p>

        {post.selfText && (
          <p className="post-text">{post.selfText}</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Postcard;
