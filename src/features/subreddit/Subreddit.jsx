import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./subreddit.css";
import useIsMobile from "../../hooks/useIsMobile";


/**
 * A component that displays a subreddit card, which includes the subreddit's
 * icon, name, description, and external link to the subreddit on Reddit.
 * When the card is clicked, it navigates to the subreddit's relative URL.
 * If the user is on a mobile device, it hides the subreddit banner and only displays
 * the icon, name, description, and external link.
 * @param {object} subreddit - The subreddit object with the following properties:
 *   relativeUrl - The relative URL of the subreddit, e.g. /r/reactjs
 *   displayName - The display name of the subreddit, e.g. "r/reactjs"
 *   icon - The URL of the subreddit's icon, e.g. https://b.thumbs.redditmedia.com/8e6hFQV3Q4OQ9z2j6RA.png
 *   banner - The URL of the subreddit's banner, e.g. https://b.thumbs.redditmedia.com/v9xOqkHvz4OQ9z2j6RA.png
 *   description - The description of the subreddit, e.g. "A community for discussing ReactJS"
 *   url - The external URL of the subreddit on Reddit, e.g. https://www.reddit.com/r/reactjs/
 */
const Subreddit = ({ subreddit }) => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    if (!subreddit) return null;

    console.log("Subreddit", subreddit.relativeUrl)

    const truncate = (text, maxLength = 160) => {
        return text?.length > maxLength ? text.slice(0, maxLength) + "…" : text;
    };

    const handleCardClick = () => {
        navigate(`${subreddit.relativeUrl}`);
    };

    return (
        <div className="subreddit-card"
            onClick={handleCardClick}
            role="button"
            onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
            tabIndex={0}
        >

            {!isMobile && (
                <div className="subreddit-banner">
                    <img
                        src={subreddit.banner || "/snoo-nopreview.png"}
                        alt={`${subreddit.displayName} banner`}
                        onError={(e) => { e.currentTarget.src = "/snoo-nopreview.png"; }}
                    />
                </div>
            )}

            <div className="subreddit-content">
                <div className="subreddit-header">
                    <img
                        src={subreddit.icon || "/snoo-nopreview.png"}
                        alt={subreddit.displayName}
                        className="subreddit-icon"
                        onError={(e) => { e.currentTarget.src = "/snoo-nopreview.png"; }}
                    />
                    <span className="subreddit-name">{subreddit.displayName}</span>
                </div>

                <p className="subreddit-description">{truncate(subreddit.description, 180)}</p>

                <div className="subreddit-bottom">
                    <button
                        className="external-button"
                        onClick={() => window.open(subreddit.url, "_blank")}
                        aria-label="Open subreddit on Reddit"
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
};

export default Subreddit;
