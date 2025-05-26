import logo from './logo.svg';
import './App.css';

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Import AuthProvider and useAuth
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CollectionPage from './pages/CollectionPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
import LoadingSpinner from './components/common/LoadingSpinner'; // For initial auth loading

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loadingAuth } = useAuth();

  if (loadingAuth) {
    return <LoadingSpinner />; // Show loading while auth status is being determined
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider> {/* Wrap the entire application with AuthProvider */}
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/collections"
            element={
              <PrivateRoute>
                <CollectionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} /> {/* Catch-all for undefined routes */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
