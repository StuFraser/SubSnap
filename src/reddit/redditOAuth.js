import { setToken } from "./RedditAuthSlice";

// ===============================
//  CONFIG
// ===============================
const REDDIT_CLIENT_ID = import.meta.env.VITE_REDDIT_CLIENT_ID;
const REDDIT_REDIRECT_URI = import.meta.env.VITE_REDDIT_REDIRECT_URI; // e.g. https://yourusername.github.io/yourapp/
const REDDIT_SCOPES = "read identity"; // add more if needed, e.g. "mysubreddits,submit"

// ===============================
// 1️⃣ IMPLICIT GRANT FLOW (Frontend-only, Safe for GitHub Pages)
// ===============================

// Step 1: Redirect user to Reddit for login
export const redirectToRedditAuth = () => {
  const state = crypto.randomUUID(); // random string to prevent CSRF

  const authUrl = new URL("https://www.reddit.com/api/v1/authorize");
  authUrl.searchParams.set("client_id", REDDIT_CLIENT_ID);
  authUrl.searchParams.set("response_type", "token");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("redirect_uri", REDDIT_REDIRECT_URI);
  authUrl.searchParams.set("duration", "temporary"); // or "permanent"
  authUrl.searchParams.set("scope", REDDIT_SCOPES);

  window.location.href = authUrl.toString();
};

// Step 2: Parse token after redirect & store in Redux
export const parseRedditAccessToken = (dispatch) => {
  if (!window.location.hash) return null;

  const params = new URLSearchParams(window.location.hash.substring(1)); // remove "#"
  const accessToken = params.get("access_token");
  const tokenType = params.get("token_type");
  const state = params.get("state");

  // Verify state matches (optional CSRF check)
  // You could store state in a Redux slice instead of localStorage if desired
  // For now we skip state verification since we're Redux-only

  if (accessToken) {
    const expiry = Date.now() + 3600 * 1000; // Reddit implicit tokens usually last 1 hour

    dispatch(
      setToken({
        authToken: accessToken,
        refreshToken: null, // implicit flow does not provide refresh token
        expiry,
      })
    );

    // Clean up URL
    window.history.replaceState({}, document.title, window.location.pathname);

    return accessToken;
  }

  return null;
};

// Step 3: Helper to make authenticated Reddit API calls
export const redditFetch = async (endpoint, accessToken) => {
  const response = await fetch(`https://oauth.reddit.com${endpoint}`, {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error(`Reddit API error: ${response.status}`);
  return await response.json();
};

// Optional: App-only token (script/confidential apps)
// Only use in server-side / local testing. Not safe in frontend production.
export const getAppAccessToken = async () => {
  const creds = btoa(
    `${REDDIT_CLIENT_ID}:${import.meta.env.VITE_REDDIT_CLIENT_SECRET}`
  );

  const response = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  if (!response.ok) throw new Error("Failed to get Reddit app token");
  const data = await response.json();
  return data.access_token;
};
