// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { getUserProfile, updateUserProfile } from '../api/userApi';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { isAuthenticated, currentUser, getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const userId = currentUser?._id;
        const token = getToken();
        if (!userId || !token) {
            setError('Authentication error: User ID or token missing. Please log in again.');
            setLoading(false);
            return;
        }
        const data = await getUserProfile(userId, token);
        setUserProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, currentUser, getToken, navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const userId = currentUser?._id;
      const token = getToken();
      if (!userId || !token) {
        setError('Authentication error: User ID or token missing. Please log in again.');
        setLoading(false);
        return;
      }
      const updatedData = {
        username: userProfile.username,
        email: userProfile.email,
        // Add other fields you want to allow updating
      };
      await updateUserProfile(userId, updatedData, token);
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false); // Exit editing mode
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(null), 3000); // Clear success after 3s
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '20px auto',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const formGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  };

  if (!isAuthenticated && !loading) {
    return <div className="container margin-top-20">Please log in to view your profile.</div>;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div style={containerStyle}>
      <h1>User Profile</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}

      {!isEditing ? (
        <div>
          <p><strong>Username:</strong> {userProfile?.username}</p>
          <p><strong>Email:</strong> {userProfile?.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleUpdateProfile}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Username:</label>
            <input
              type="text"
              name="username"
              value={userProfile?.username || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email:</label>
            <input
              type="email"
              name="email"
              value={userProfile?.email || ''}
              onChange={handleChange}
              required
            />
          </div>
          {/* Add more fields here if your user model has them and you want to edit them */}
          <div style={buttonGroupStyle}>
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;