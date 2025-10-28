import { useState, useEffect } from "react";
import useIsMobile from "../../hooks/useIsMobile";
import "./Post.css"


/**
 * A React component that renders a post from Reddit.
 * 
 * @param {Object} props - an object containing the post to render.
 * @param {Object} props.post - the post to render.
 * @returns {JSX.Element} - a JSX element representing the post.
 */
const Post = (props) => {

    const { post } = props;
    const isMobile = useIsMobile();

    //console.log("post:", post);
    //console.log("selftext:", post.selfText);

    const truncate = (text, maxLength = 160) => {
        const returnValue = text?.length > maxLength ? text.slice(0, maxLength) + "…" : text;
        //console.log(returnValue);
        return returnValue;
    }


    return (
        <div className="post-card">
            {/*Thumb nail panel.  Only render on big screens*/}
            {!isMobile && (
                <div className="post-thumbnail">
                    <img
                        src={post.thumbnailUrl || "/snoo-nopreview.png"}
                        alt="post thumbnail"
                        onError={(e) => { e.currentTarget.src = "/snoo-nopreview.png"; }}
                    />
                </div>
            )}

            {/* Right panel: content */}
            <div className="post-content">
                {/* Top: Post title */}
                <h2 className="post-title">{truncate(post.title, 180)}</h2>

                {/* Middle: Selftext, truncated */}
                <p className="post-selfText">{truncate(post.selfText, 200)}</p>

                {/* Bottom row: Author + button */}
                <div className="post-bottom">
                    <div className="post-author">
                        <img
                            className="author-avatar"
                            src={post.authorAvatarUrl || "/default-avatar.png"}
                            alt={post.author || "Author avatar"}
                        />
                        <span className="author-name">{post.author}</span>
                    </div>

                    <button
                        className="external-button"
                        onClick={() => window.open(post.url, "_blank")}
                        aria-label="Open on Reddit"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M6 2a.5.5 0 0 0 0 1h5.293L3.146 11.146a.5.5 0 0 0 .708.708L12 3.707V9a.5.5 0 0 0 1 0V2H6z" />
                        </svg>
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Post;