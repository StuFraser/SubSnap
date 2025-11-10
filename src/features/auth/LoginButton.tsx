import React from "react";
import { login } from "@/api/auth";
import "./LoginButton.css";



const LoginButton: React.FC = () => {
    
  const handleLogin = () => {
    login(); 
  };

  return (
    <button
      className="login-button"
      onClick={handleLogin}
    >
      Login
    </button>
  );
};

export default LoginButton;