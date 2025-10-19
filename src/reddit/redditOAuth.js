import { setToken } from "../features/auth/RedditAuthSlice";

// ===============================
//  oAuth config
// ===============================
const REDDIT_CLIENT_ID = import.meta.env.VITE_REDDIT_CLIENT_ID;
const REDDIT_REDIRECT_URI = import.meta.env.VITE_REDDIT_REDIRECT_URI; // e.g. https://yourusername.github.io/yourapp/
const REDDIT_SCOPES = import.meta.env.VITE_REDDIT_SCOPES; // add more if needed, e.g. "mysubreddits,submit"

// ===============================
//  oAuth config
// ===============================

export const redirectToRedditAuth = () => {
  const state = crypto.randomUUID();

  const authUrl = new URL("https://www.reddit.com/api/v1/authorize");
  authUrl.searchParams.set("client_id", REDDIT_CLIENT_ID);
  authUrl.searchParams.set("response_type", "token");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("redirect_uri", REDDIT_REDIRECT_URI);
  authUrl.searchParams.set("duration", "temporary"); 
  authUrl.searchParams.set("scope", REDDIT_SCOPES);

  window.location.href = authUrl.toString();
};

export const parseRedditAccessToken = (dispatch) => {
  if (!window.location.hash) return null;

  const params = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = params.get("access_token");
  const tokenType = params.get("token_type");
  const state = params.get("state");

  if (accessToken) {
    const expiry = Date.now() + 3600 * 1000; 

    dispatch(setToken({
        authToken: accessToken,
        expiry,
      })
    );

    window.history.replaceState({}, document.title, window.location.pathname);

    return accessToken;
  }

  return null;
};

