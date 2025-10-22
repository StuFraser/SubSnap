import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/auth/RedditAuthSlice"
import "./NavBar.css";

const NavBar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const links = [
    { path: "/", label: "Home" },
    { path: "/default", label: "Feed", protected: true },
    { path: "/favorites", label: "Favorites", protected: true },
    { path: "/popular", label: "Popular", protected: true },
    { path: "/new", label: "New", protected: true },
  ];

  return (
    <nav className="main-nav">
      {links.map(({ path, label, protected: isProtected }) => (
        <Link
          key={path}
          to={path}
          className={isProtected && !isAuthenticated ? "nav-item disabled-link" : "nav-item"}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
