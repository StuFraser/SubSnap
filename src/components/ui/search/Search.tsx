import React, { useState } from "react";
import "./Search.css";

interface SearchProps {
  onSearch: (query: string) => void;
  enabled: boolean;
}


const Search:React.FC<SearchProps> = ({ onSearch, enabled }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <form className="search-container" onSubmit={handleSubmit}>
            <input
                type="text"
                className="search-input"
                placeholder="Search subreddits..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={!enabled}
            />
            <button type="submit"
                className="search-button"
                aria-label="Search"
                disabled={!enabled}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="search-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                    />
                </svg>
            </button>
        </form>
    );
}

export default Search;