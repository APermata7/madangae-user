// src/components/common/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();

  const navStyles = {
    backgroundColor: '#333',
    padding: '1rem',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkStyles = {
    color: 'white',
    textDecoration: 'none',
  };

  const buttonStyles = {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '0 5px',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'background-color 0.2s',
  };

  const greetingStyles = {
    color: 'white',
    fontSize: '1.1em',
    fontWeight: '500',
    margin: '0 20px',
  };

  const rightSectionStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  return (
    <nav style={navStyles}>
      <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
        <Link to="/" style={linkStyles}>Madangae</Link>
      </div>

      <div style={rightSectionStyles}>
        {isAuthenticated && (
          <div style={greetingStyles}>
            Hello, {currentUser?.username || 'User'}!
          </div>
        )}
        {isAuthenticated && (
          <>
            <Link to="/menu" style={buttonStyles}>
              Menu
            </Link>
            <Link to="/collections" style={buttonStyles}>
              My Collections
            </Link>
            <Link to="/profile" style={buttonStyles}>
              Profile
            </Link>
            <button 
              onClick={logout} 
              style={{
                ...buttonStyles,
                backgroundColor: '#dc3545'
              }}>
              Logout
            </button>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Link to="/login" style={buttonStyles}>Login</Link>
            <Link to="/signup" style={buttonStyles}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;