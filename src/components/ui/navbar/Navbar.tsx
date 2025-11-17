import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/shared/context/AuthContext";
import Search from "../search/Search";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <button
          className={`burger ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          {user && (
            <>
              <li>
                <Link to="/subreddit/popular" className="nav-link" onClick={closeMenu}>
                  Popular
                </Link>
              </li>
              <li>
                <Link
                  to="/subscribed"
                  className="nav-link"
                  onClick={closeMenu}
                >
                  My Subreddits
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="search">
        <Search enabled={!user} onSearch={() => { }} />
      </div>
    </nav>
  );
}

export default Navbar;
