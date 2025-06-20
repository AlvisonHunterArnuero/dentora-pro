'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();
  const { data, error, loading, fetchWithAuth } = useApi<{ isAuthenticated: boolean; user: UserProfile | null }>();

  const fetchUserStatus = useCallback(async () => {
    try {
      await fetchWithAuth('/api/auth/token', 'GET');
    } catch (err) {
      console.error('Failed to fetch user status:', err);
    }
  }, [fetchWithAuth]);

  useEffect(() => { fetchUserStatus(); }, [fetchUserStatus]);
  useEffect(() => {
    if (data) setUser(data.user);
    else if (error) setUser(null);
  }, [data, error]);

  const login = (userProfile: UserProfile) => { setUser(userProfile); };
  const logout = async () => {
    try {
      await logoutAction();
      setUser(null);
      router.replace('/');
      router.refresh();
    } catch (error) {
      console.error('Error during logout:', error);
      setUser(null);
      router.replace('/');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, loading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
