import React from "react";
import "./Header.css";
import { useAuth } from "@/shared/hooks/useAuth";
//import UserAvatar from "@/features/auth/UserAvatar";
import LoginButton from "@/features/auth/LoginButton";

const Header: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="header">
      <div className="header-logo">
        <img src="/banner-large.png" alt="SubSnap Logo" />
      </div>
      <div className="header-user">
        {isAuthenticated && user ? "user" /*<UserAvatar user={user} />*/ : <LoginButton />}
      </div>
    </header>
  );
};

export default Header;
