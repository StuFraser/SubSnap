import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/auth/RedditAuthSlice";
import "./NavBar.css";
import Search from "../../features/search/search";

const NavBar = ({ onSearch }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Map labels to subreddit routes
  const navItems = [
    { label: "Home", subreddit: "all" },
    { label: "Ask", subreddit: "AskReddit" },
    { label: "Popular", subreddit: "popular" },
  ];

  const handleOnSearch = (searchTerm) => {
    onSearch(searchTerm);
  };

  return (
    <nav className="main-nav">
        {navItems.map(({ label, subreddit }) => (

            <NavLink
              to={`/r/${subreddit}`}
              className={({ isActive }) => {
                let classes = "nav-item";
                if (isActive) classes += " active";
                return classes;
              }}
            >
              {label}
            </NavLink>

        ))}


      <div className="nav-right">
        <Search onSearch={handleOnSearch} enabled={isAuthenticated} />
      </div>
    </nav>
  );
};

export default NavBar;
