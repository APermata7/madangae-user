// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser as apiLoginUser, signupUser as apiSignupUser } from '../api/authApi';

// Create a context for authentication
const AuthContext = createContext(null);

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedToken = localStorage.getItem('authToken');
    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        logout(); // Clear invalid stored data
      }
    }
    setLoadingAuth(false);
  }, []);

  const login = async (email, password) => {
    setLoadingAuth(true);
    setAuthError(null);
    try {
      const { user, token } = await apiLoginUser(email, password);
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('authToken', token);
      return { success: true };
    } catch (error) {
      setAuthError(error.message || 'Login failed');
      return { success: false, error: error.message };
    } finally {
      setLoadingAuth(false);
    }
  };

  const signup = async (username, email, password) => {
    setLoadingAuth(true);
    setAuthError(null);
    try {
      const { user, token } = await apiSignupUser(username, email, password);
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('authToken', token);
      return { success: true };
    } catch (error) {
      setAuthError(error.message || 'Signup failed');
      return { success: false, error: error.message };
    } finally {
      setLoadingAuth(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
  };

  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  const value = {
    currentUser,
    isAuthenticated,
    loadingAuth,
    authError,
    login,
    signup,
    logout,
    getToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};