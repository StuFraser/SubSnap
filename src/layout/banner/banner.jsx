import React from "react";
import { useSelector } from "react-redux";
import AuthButton from "../../features/auth/AuthButton";
import HeaderProfile from "../../features/user/HeaderProfile";
import bannersmall from "../../assets/banner-small.png";
import "./banner.css";


export default function Banner() {
  const isAuthenticated = useSelector((state) => state.redditAuth.isAuthenticated);

  return (
    <header className="banner">
      <img src={bannersmall} alt="Logo" className="banner-logo" />

      <div className="banner-right">
        {isAuthenticated ? <HeaderProfile /> : <AuthButton />}
      </div>
    </header>
  );
}
