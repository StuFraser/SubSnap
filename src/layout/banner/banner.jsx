import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AuthButton from "../../features/auth/AuthButton";
import HeaderProfile from "../../features/user/HeaderProfile";
import bannersmall from "../../assets/banner-small.png";
import { selectIsAuthenticated, clearToken } from "../../features/auth/RedditAuthSlice"
import { selectUserProfile, fetchUserProfile, selectUserProfileLoading, selectUserProfileError, clearUser } from "../../features/user/UserProfileSlice";
import UserProfile from "../../features/user/UserProfile";
import Spinner from "../../layout/spinner/Spinner";
import NavBar from "../navigation/navbar";
import "./banner.css";


const Banner = ({onSearch}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const profile = useSelector(selectUserProfile);
  const loading = useSelector(selectUserProfileLoading);
  const error = useSelector(selectUserProfileError);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, dispatch]);


  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPopupOpen]);


  const handleAvatarClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleLogOut = () => {
    dispatch(clearUser());
    dispatch(clearToken());
    setIsPopupOpen(false);
  }

  const handleOnSearch = (searchTerm) => {
    //console.log("Banner.jsx", searchTerm);
    onSearch(searchTerm);
  }

  return (
    <header className="banner">
      
      <div className="banner-top">
        <img src={bannersmall} alt="Logo" className="banner-image" />
        <div className="banner-right">
          {!isAuthenticated && <AuthButton />}

          {isAuthenticated && loading && <Spinner />}

          {isAuthenticated && error && (
            <div className="error-profile">
              <span>Error loading profile</span>
              <button onClick={() => dispatch(fetchUserProfile())}>Retry</button>
            </div>
          )}
          <div onClick={handleAvatarClick}>
            {isAuthenticated && profile && <HeaderProfile />}
          </div>
          {isPopupOpen && <UserProfile onClose={handleClosePopup} onLogout={handleLogOut} />}
        </div>
      </div>
      <NavBar onSearch={handleOnSearch} />
    </header>
  );
}

export default Banner;
