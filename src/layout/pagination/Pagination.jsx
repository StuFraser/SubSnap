import React, { useEffect } from "react";
import "./Pagination.css";

const Pagination = ({onNextClick, onPrevClick, before = null, after = null, page = 0}) => {
    
    console.log(`Before: ${before} After: ${after}, page:${page}`);

    return (
        <div className="pagination">
            <button
                className="page-button"
                onClick={() => onPrevClick()}
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
                onClick={() => onNextClick()}
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