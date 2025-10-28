import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { redirectToRedditAuth, parseRedditAccessToken } from "../../reddit/redditOAuth";

/**
 * A React component that renders a button to login with Reddit.
 * When clicked, it redirects the user to the Reddit OAuth authorization page.
 * After authorization, it stores the access token in the Redux store.
 */
const AuthButton = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // After redirect from Reddit, store token in Redux
    parseRedditAccessToken(dispatch);
  }, [dispatch]);

  return (
    <button onClick={redirectToRedditAuth}>
      Login with Reddit
    </button>
  );
}

export default AuthButton;