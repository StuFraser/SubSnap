import type { User } from "@/shared/models/User";
import type { AuthToken } from "@/shared/models/AuthToken";

export interface AuthContext {
  user: User | null;
  token: AuthToken | null;
  login: (token: AuthToken) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}