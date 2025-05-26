// src/pages/SignupPage.js
import React, { useEffect } from 'react';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const { signup, loadingAuth, authError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile'); // Redirect if already logged in
    }
  }, [isAuthenticated, navigate]);

  const handleSignup = async (username, email, password) => {
    const { success } = await signup(username, email, password);
    if (success) {
      navigate('/profile'); // Redirect on successful signup
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
        <SignupForm onSignup={handleSignup} loading={loadingAuth} error={authError} />
      </div>
    </div>
  );
};

export default SignupPage;