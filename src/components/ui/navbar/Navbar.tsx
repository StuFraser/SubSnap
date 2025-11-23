import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/shared/context/AuthContext";
import Search from "../search/Search";
import { searchSubreddits } from "@/app/store/subredditsSlice";
import { useAppDispatch } from "@/shared/hooks/hooks";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleSearch = (query: string) => {
    if (!query) {return;}
    dispatch(searchSubreddits(query.trim()));
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }
 
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
        <div className="search">
          <Search enabled={isAuthenticated} onSearch={handleSearch} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
