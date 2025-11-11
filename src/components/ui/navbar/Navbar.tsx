import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/shared/context/AuthContext";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" className="nav-logo-link">
            SubSnap
          </Link>
        </div>

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
          <li>
            <Link to="/subreddit/popular" className="nav-link" onClick={closeMenu}>
              Popular
            </Link>
          </li>
          {user && (
            <li>
              <Link
                to="/my-subreddits"
                className="nav-link"
                onClick={closeMenu}
              >
                My Subreddits
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
