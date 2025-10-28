import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/auth/RedditAuthSlice";
import "./NavBar.css";
import Search from "../../features/search/search";
import MobileProfile from "../../features/user/MobileProfile";
import useIsMobile from "../../hooks/useIsMobile";

const NavBar = ({ onSearch }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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
      <div className="nav-left">

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>


        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {isAuthenticated && isMobile && <MobileProfile />}
          {navItems.map(({ label, subreddit }) => (
            <NavLink
              key={subreddit}
              to={`/r/${subreddit}`}
              className={({ isActive }) =>
                `nav-item${isActive ? " active" : ""}`
              }
              onClick={() => setMenuOpen(false)} // close menu after selecting
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>


      <div className="nav-right">
        <Search onSearch={handleOnSearch} enabled={isAuthenticated} />
      </div>
    </nav>
  );
};

export default NavBar;
