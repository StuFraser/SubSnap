import type { AuthToken } from '../models/AuthToken';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const PKCE_VERIFIER_KEY = 'pkce_verifier';
const PKCE_STATE_KEY = 'pkce_state';

export const sessionService = {
  // PKCE
  setVerifier(verifier: string) {
    sessionStorage.setItem(PKCE_VERIFIER_KEY, verifier);
  },
  getVerifier(): string | null {
    return sessionStorage.getItem(PKCE_VERIFIER_KEY);
  },
  removeVerifier() {
    sessionStorage.removeItem(PKCE_VERIFIER_KEY);
  },

  setState(state: string) {
    sessionStorage.setItem(PKCE_STATE_KEY, state);
  },
  getState(): string | null {
    return sessionStorage.getItem(PKCE_STATE_KEY);
  },
  removeState() {
    sessionStorage.removeItem(PKCE_STATE_KEY);
  },

  // Tokens
  setToken(token: AuthToken) {

    console.log("Storing access token:", token.access_token);

    sessionStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
    if (token.refresh_token) {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, token.refresh_token);
    }
  },
  getToken(): AuthToken | null {
    const access_token = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    const refresh_token = sessionStorage.getItem(REFRESH_TOKEN_KEY);
    if (!access_token) return null;

    return {
      access_token,
      token_type: 'bearer', 
      expires_in: 3600,     
      scope: '',           
      refresh_token: refresh_token || undefined,
      obtained_at: Date.now(),
    };
  },
  clearToken() {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};
