import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('recipe_app_token') || null);
  const [loading, setLoading] = useState(true);

  // Restore session from token on mount
  useEffect(() => {
    const restoreSession = async () => {
      if (token) {
        try {
          const data = await authService.getProfile();
          if (data && data.user) {
            setUser(data.user);
          } else {
            // Invalid data format, clear auth
            handleLogoutState();
          }
        } catch (error) {
          console.error('Failed to restore session:', error);
          handleLogoutState();
        }
      }
      setLoading(false);
    };
    
    restoreSession();
  }, [token]);

  const handleLogoutState = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('recipe_app_token');
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      if (data && data.token && data.user) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('recipe_app_token', data.token);
        return { success: true };
      }
      return { success: false, message: 'Invalid response from server' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const data = await authService.register(name, email, password);
      if (data && data.token && data.user) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('recipe_app_token', data.token);
        return { success: true };
      }
      return { success: false, message: 'Invalid response from server' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: error.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    handleLogoutState();
  };

  const updateProfile = async (profileData) => {
    try {
      const data = await authService.updateProfile(profileData);
      if (data && data.user) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, message: 'Invalid profile response' };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, message: error.message || 'Profile update failed' };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await authService.changePassword(currentPassword, newPassword);
      return { success: true };
    } catch (error) {
      console.error('Change password error:', error);
      return { success: false, message: error.message || 'Password update failed' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
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
