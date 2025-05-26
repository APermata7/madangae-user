// src/pages/LoginPage.js
import React, { useEffect } from 'react';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login, loadingAuth, authError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile'); // Redirect if already logged in
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (email, password) => {
    const { success } = await login(email, password);
    if (success) {
      navigate('/profile'); // Redirect on successful login
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 60px)', // Adjust based on Navbar height
    backgroundColor: '#f0f2f5',
  };

  const formContainerStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <LoginForm onLogin={handleLogin} loading={loadingAuth} error={authError} />
      </div>
    </div>
  );
};

export default LoginPage;