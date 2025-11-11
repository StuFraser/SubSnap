import React from "react";
import "./Header.css";
import { useAuthContext } from "@/shared/context/AuthContext";
import UserAvatar from "@/features/auth/UserAvatar";
import LoginButton from "@/features/auth/LoginButton";
import Navbar from "../ui/navbar/Navbar";

const Header: React.FC = () => {
  const { user, logout } = useAuthContext();
  const isAuthenticated = !!user;

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-logo">
          <img src="/banner-large.png" alt="SubSnap Logo" />
        </div>
        <div className="header-user">
          {isAuthenticated && user ? (
            <UserAvatar user={user} onLogout={logout} />
          ) : (
            <LoginButton />
          )}
          
        </div>
      </div>
      <div className="header-bottom">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;

