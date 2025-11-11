import React from "react";
import "./Header.css";
import { useAuthContext } from "@/shared/context/AuthContext";
import UserAvatar from "@/features/auth/UserAvatar";
import LoginButton from "@/features/auth/LoginButton";
import Spinner from "@/features/ui/spinner/Spinner";

const Header: React.FC = () => {
  const { user, logout, isLoading } = useAuthContext();
  const isAuthenticated = !!user;

  if (isLoading) return <Spinner />;

  return (
    <header className="header">
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
    </header>
  );
};

export default Header;
