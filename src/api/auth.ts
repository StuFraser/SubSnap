import { sessionService } from '../shared/utils/SessionService';
import type { AuthToken } from '../shared/models/AuthToken';

const REDDIT_CLIENT_ID = import.meta.env.VITE_REDDIT_CLIENT_ID as string;
const REDDIT_REDIRECT_URI = import.meta.env.VITE_REDDIT_REDIRECT_URI as string;
const REDDIT_SCOPES = import.meta.env.VITE_REDDIT_SCOPES?.replace(/"/g, '') || 'read identity mysubreddits';

const REDDIT_AUTHORIZE_URL = 'https://www.reddit.com/api/v1/authorize';
const REDDIT_TOKEN_URL = 'https://www.reddit.com/api/v1/access_token';

// Generate a random code verifier
export const generateCodeVerifier = (length = 128): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let verifier = '';
  for (let i = 0; i < length; i++) {
    verifier += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return verifier;
}

export const generateCodeChallenge = async (verifier: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashString = String.fromCharCode(...hashArray);
  return btoa(hashString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export const login = async () => {
  const state = crypto.randomUUID();
  const verifier = generateCodeVerifier();

  sessionService.setVerifier(verifier);
  sessionService.setState(state);

  const challenge = await generateCodeChallenge(verifier);

  const params = new URLSearchParams({
    client_id: REDDIT_CLIENT_ID,
    response_type: 'code',
    state,
    redirect_uri: REDDIT_REDIRECT_URI,
    duration: 'permanent',
    scope: REDDIT_SCOPES,
    code_challenge_method: 'S256',
    code_challenge: challenge,
  });

  window.location.href = `${REDDIT_AUTHORIZE_URL}?${params.toString()}`;
}

// Exchange code for access token
export const fetchAccessToken = async (code: string, returnedState: string): Promise<AuthToken> => {
  const storedState = sessionService.getState();
  const verifier = sessionService.getVerifier();

  if (!verifier) throw new Error('PKCE verifier not found');
  if (!storedState || storedState !== returnedState) throw new Error('Invalid state');

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDDIT_REDIRECT_URI,
    code_verifier: verifier,
  });

  const response = await fetch(REDDIT_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${REDDIT_CLIENT_ID}:`), // No secret
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error('Failed to fetch access token: ' + errText);
  }

  const data = await response.json() as AuthToken;

  // store token and cleanup verifier/state

  console.log("Fetched access token:", data.access_token);

  sessionService.setToken(data);
  sessionService.removeVerifier();
  sessionService.removeState();

  return data;
}


