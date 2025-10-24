import { useState, useEffect } from "react";
import "./Post.css"

/*   
    id: p.data.id,
       title: p.data.title,
       selfText: p.data.selfText,
       author: p.data.author,
       url: p.data.url,
       score: p.data.score,
       over_18: p.data.over_18,
       commentCount: p.data.commentCount,
*/


function useIsMobile(breakpoint = 600) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);

    return isMobile;
}


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