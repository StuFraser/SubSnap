import { useState, useEffect } from "react";
import { fetchCurrentUser } from "@/api/redditUser";
import type { User } from "@/shared/models/User";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await fetchCurrentUser();
        setUser(currentUser);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      }
    }

    fetchUser();
  }, []);

  return { user, isAuthenticated };
};
