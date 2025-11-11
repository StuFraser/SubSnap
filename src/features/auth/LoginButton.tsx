import React from "react";
import { useAuthContext } from "@/shared/context/AuthContext";
import "./LoginButton.css";
import Spinner from "../../components/ui/spinner/Spinner";

const LoginButton: React.FC = () => {
  const { login, isLoading } = useAuthContext();

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <button className="login-button" onClick={login} disabled={isLoading}>
        Login
      </button>
    );
  }
};

export default LoginButton;