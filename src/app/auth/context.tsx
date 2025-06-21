'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/app/action/actions';

type UserProfile = {
  id: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  login: (userProfile: UserProfile) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchUserStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/token', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Failed to fetch user status:', err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserStatus();
  }, [fetchUserStatus]);

  const login = (userProfile: UserProfile) => {
    setUser(userProfile);
  };

  const logout = async () => {
    try {
      await logoutAction();
      setUser(null);
      router.replace('/');
      // clear any cached data
      router.refresh();
    } catch (error) {
      console.error('Error during logout:', error);
      setUser(null);
      router.replace('/');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading,
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};