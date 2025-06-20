'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useApi } from '@/_hooks/useApi';
import { logoutAction } from '@/actions/auth';

type UserProfile = { id: string; email: string; role?: string };
type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  user: UserProfile | null;
  login: (userProfile: UserProfile) => void;
  logout: () => void;
};

  const defaultContext: AuthContextType = {
  isAuthenticated: false,
  loading: false,
  user: null,
  login: () => {},
  logout: () => {},
};
const AuthContext = createContext<AuthContextType>(defaultContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { loading, fetchWithAuth } = useApi<{
    isAuthenticated: boolean;
    user: UserProfile | null;
  }>();

  const fetchUserStatus = useCallback(async () => {
    // Skips auth check on login page
    if (pathname === '/') {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      const response = await fetchWithAuth('/api/auth/token', 'GET');
      setIsAuthenticated(response.isAuthenticated);
      setUser(response.user);
    } catch (err) {
      console.error('Failed to fetch user status:', err);
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [fetchWithAuth, pathname]);

  useEffect(() => {
    fetchUserStatus();
  }, [fetchUserStatus]);

  const login = useCallback((userProfile: UserProfile) => {
    setUser(userProfile);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutAction();
      setUser(null);
      setIsAuthenticated(false);
      router.replace('/');
    } catch (error) {
      console.error('Error during logout:', error);
      setUser(null);
      setIsAuthenticated(false);
      router.replace('/');
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context; 
}