import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/shared/context/AuthContext";
import Spinner from "@/components/ui/spinner/Spinner";

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const { completeLogin } = useAuthContext();
  const hasHandled = useRef(false); // prevent double invocation

  useEffect(() => {
    if (hasHandled.current) return;
    hasHandled.current = true;

    const runLogin = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");
      const error = url.searchParams.get("error");

      if (error) {
        console.error("OAuth error:", error);
        navigate("/");
        return;
      }

      if (!code || !state) {
        console.error("Missing code or state in callback URL");
        navigate("/");
        return;
      }

      try {
        await completeLogin(code, state);
        window.history.replaceState({}, document.title, window.location.pathname);
        navigate("/");
      } catch (err) {
        console.error("Login failed:", err);
        navigate("/");
      }
    };

    runLogin();
  }, [completeLogin, navigate]);

  return <div><Spinner /></div>;
};

export default Callback;
