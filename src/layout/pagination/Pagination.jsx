import React, { useEffect } from "react";
import "./Pagination.css";

const Pagination = () => {

    return (
        <div className="pagination">
            <button
                className="page-button"
                onClick={() => fetchPosts("prev")}
                disabled={!before}
                aria-label="Previous page"
            >
                {/* Left arrow SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <span className="page-number">Page {page}</span>

            <button
                className="page-button"
                onClick={() => fetchPosts("next")}
                disabled={!after}
                aria-label="Next page"
            >
                {/* Right arrow SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    )
}

export default Pagination;