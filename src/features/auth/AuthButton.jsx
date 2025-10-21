import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { redirectToRedditAuth, parseRedditAccessToken } from "../../reddit/redditOAuth";
import "./AuthButton.css";

export default function AuthButton() {
  const dispatch = useDispatch();

  useEffect(() => {
    // After redirect from Reddit, store token in Redux
    parseRedditAccessToken(dispatch);
  }, [dispatch]);

  return (
    <button className="auth-button" onClick={redirectToRedditAuth}>
      Login with Reddit
    </button>
  );
}