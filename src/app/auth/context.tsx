"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/login/server-actions";

type UserProfile = {
  id: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  token: string | null;
  login: (userProfile: UserProfile, token: string) => void;
  logout: () => void;
  refreshAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchUserStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/token", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user || null);
        setToken(data.token || null);
      } else {
        setUser(null);
        setToken(null);
      }
    } catch (err) {
      console.error("Failed to fetch user status:", err);
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserStatus();
  }, [fetchUserStatus]);

  const login = (userProfile: UserProfile, token: string) => {
    setUser(userProfile);
    setToken(token);
  };

  const logout = async () => {
    try {
      await logoutAction();
      setUser(null);
      setToken(null);
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Error during logout:", error);
      setUser(null);
      setToken(null);
      router.replace("/");
    }
  };

  const refreshAuth = useCallback(() => {
    fetchUserStatus();
  }, [fetchUserStatus]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading,
        user,
        token,
        login,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
