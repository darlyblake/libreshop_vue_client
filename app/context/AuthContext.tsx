'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getToken, login as loginService, logout as logoutService } from '../services/authService';

interface User {
  id: string;
  email: string;
  role: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(getToken());

  useEffect(() => {
    // Fetch user info on token change (simple example)
    if (token) {
      // TODO: fetch user profile using token from API (/auth/me)
      // For now, simulate user info from token
      setUser({ id: 'user-1', email: 'user@example.com', role: 'USER' });
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const response = await loginService(email, password);
    if (response.token) {
      setToken(response.token);
      setUser(response.user);
    }
  };

  const logout = () => {
    logoutService();
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
