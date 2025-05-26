// src/pages/HomePage.js
import React from 'react';

const HomePage = () => {
  const containerStyle = {
    textAlign: 'center',
    padding: '50px 20px',
    backgroundColor: '#e9ecef',
    minHeight: 'calc(100vh - 60px)', /* Assuming Navbar is 60px */
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const titleStyle = {
    fontSize: '3em',
    color: '#007bff',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '1.2em',
    color: '#555',
    maxWidth: '800px',
    margin: '0 auto 30px auto',
    lineHeight: '1.6',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Welcome to Madangae!</h1>
      <p style={paragraphStyle}>
        Discover a world of delicious food and unique dining experiences. Explore our menu,
        create your own personalized collection of favorite dishes, and manage your profile.
        Madangae is your gateway to culinary delights!
      </p>
      <p style={paragraphStyle}>
        Log in or sign up to start your culinary journey today!
      </p>
    </div>
  );
};

export default HomePage;