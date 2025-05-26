// src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const containerStyle = {
    textAlign: 'center',
    padding: '50px 20px',
    minHeight: 'calc(100vh - 60px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  };

  const titleStyle = {
    fontSize: '4em',
    color: '#dc3545',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '1.2em',
    color: '#555',
    marginBottom: '30px',
  };

  const linkStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 25px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '1.1em',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>404</h1>
      <p style={paragraphStyle}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={linkStyle}>Go to Home Page</Link>
    </div>
  );
};

export default NotFoundPage;