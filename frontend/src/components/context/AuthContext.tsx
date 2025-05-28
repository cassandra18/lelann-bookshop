// src/components/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('AuthContext useEffect: Starting verification...');
    const verifyToken = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            console.log('AuthContext useEffect: No token found in localStorage.');
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
            return;
        }

        const response = await axios.get('http://localhost:5000/api/user/verify', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
          withCredentials: true,
        });

        if (response.status === 200 && response.data.user) {
          console.log('AuthContext useEffect: User verified successfully.', response.data.user);
          setIsAuthenticated(true);
          setUser(response.data.user);
        } else {
          console.log('AuthContext useEffect: Token verification failed or user data missing from backend response.');
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('AuthContext useEffect: Error verifying token (API call failed or non-2xx response):', error);
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUser(userData);
    console.log('User logged in:', userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    console.log('User logged out. Component calling logout should handle navigation.');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading authentication...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};