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
    margin: '0 10px',
  };

  const buttonStyles = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
  };

  return (
    <nav style={navStyles}>
      <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
        <Link to="/" style={linkStyles}>Madangae</Link>
      </div>
      <div>
        <Link to="/menu" style={linkStyles}>Menu</Link>
        {isAuthenticated && (
          <>
            <Link to="/collections" style={linkStyles}>My Collections</Link>
            <Link to="/profile" style={linkStyles}>Profile</Link>
            <span>Hello, {currentUser?.username || 'User'}!</span>
            <button onClick={logout} style={buttonStyles}>Logout</button>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Link to="/login" style={linkStyles}>Login</Link>
            <Link to="/signup" style={linkStyles}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;