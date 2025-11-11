// src/shared/hooks/useAuth.ts
import { useState, useEffect, useRef } from "react";
import { sessionService } from "@/shared/utils/SessionService";
import type { AuthToken } from "@/shared/models/AuthToken";
import type { User } from "@/shared/models/User";
import { fetchCurrentUser } from "@/api/redditUser";

// --- Move constants here ---
const REDDIT_CLIENT_ID = import.meta.env.VITE_REDDIT_CLIENT_ID as string;
const REDDIT_REDIRECT_URI = import.meta.env.VITE_REDDIT_REDIRECT_URI as string;
const REDDIT_SCOPES = import.meta.env.VITE_REDDIT_SCOPES?.replace(/"/g, '') || "read identity mysubreddits";
const REDDIT_AUTHORIZE_URL = "https://www.reddit.com/api/v1/authorize";
const REDDIT_TOKEN_URL = "https://www.reddit.com/api/v1/access_token";

// --- PKCE helpers ---
const generateCodeVerifier = (length = 128) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let verifier = "";
  for (let i = 0; i < length; i++) {
    verifier += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return verifier;
};

const generateCodeChallenge = async (verifier: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashString = String.fromCharCode(...hashArray);
  return btoa(hashString).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

// --- useAuth hook ---
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<AuthToken | null>(sessionService.getToken() || null);
  const [isLoading, setIsLoading] = useState(true);

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const init = async () => {
      if (token) {
        try {
          const currentUser = await fetchCurrentUser();
          setUser(currentUser);
        } catch {
          setUser(null);
          sessionService.clearToken();
        }
      }
      setIsLoading(false);
    };

    init();
  }, []);

  // --- login ---
  const login = async () => {
    const state = crypto.randomUUID();
    const verifier = generateCodeVerifier();

    sessionService.setState(state);
    sessionService.setVerifier(verifier);

    const challenge = await generateCodeChallenge(verifier);

    const params = new URLSearchParams({
      client_id: REDDIT_CLIENT_ID,
      response_type: "code",
      state,
      redirect_uri: REDDIT_REDIRECT_URI,
      duration: "permanent",
      scope: REDDIT_SCOPES,
      code_challenge_method: "S256",
      code_challenge: challenge,
    });

    window.location.href = `${REDDIT_AUTHORIZE_URL}?${params.toString()}`;
  };

  // --- complete login (after callback) ---
  const completeLogin = async (code: string, returnedState: string) => {
    const storedState = sessionService.getState();
    const verifier = sessionService.getVerifier();

    console.log("Stored State:", storedState);

    if (!verifier || !storedState || storedState !== returnedState) {
      throw new Error("Invalid PKCE state or verifier");
    }

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDDIT_REDIRECT_URI,
      code_verifier: verifier,
    });

    const response = await fetch(REDDIT_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa(`${REDDIT_CLIENT_ID}:`),
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error("Failed to fetch access token: " + errText);
    }

    const data = (await response.json()) as AuthToken;
    sessionService.setToken(data);
    setToken(data);

    try {
      const currentUser = await fetchCurrentUser();

      console.log("Logged in user:", currentUser);

      setUser(currentUser);
    } catch {
      console.error("Failed to fetch user after login");
      setUser(null);
    }


    sessionService.removeVerifier();
    sessionService.removeState();
  };

  const logout = () => {
    sessionService.clearToken();
    setUser(null);
    setToken(null);
  };

  return { user, token, isLoading, login, completeLogin, logout };
};
