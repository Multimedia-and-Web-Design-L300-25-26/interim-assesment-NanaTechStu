// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // In a real app, initialize from localStorage / cookies
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    // NOTE: In production, store token in an HTTP-only cookie (set by server)
    // Do NOT store JWT in localStorage for security reasons
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
