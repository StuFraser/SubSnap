import React from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import "./LoginButton.css";

const LoginButton: React.FC = () => {
  const { login, isLoading } = useAuth();

  return (
    <button className="login-button" onClick={login} disabled={isLoading}>
      {isLoading ? "Loading..." : "Login with Reddit"}
    </button>
  );
};

export default LoginButton;