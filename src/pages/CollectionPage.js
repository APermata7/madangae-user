// src/pages/CollectionPage.js
import React, { useState, useEffect } from 'react';
import CollectionItemCard from '../components/collections/CollectionItemCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { getUserCollections, removeMenuItemFromCollection } from '../api/collectionApi';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const CollectionPage = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { isAuthenticated, currentUser, getToken } = useAuth();
  const navigate = useNavigate();

    const fetchCollections = async () => {
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
        const data = await getUserCollections(userId, token);
        console.log('Collections data received from backend:', data.collections); // <-- ADD THIS
        setCollections(data.collections); // Assuming the API returns { collections: [...] }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    fetchCollections();

    // Update Listen for collections updates
    const handleCollectionsUpdate = () => {
      console.log('Collections updated, refreshing data...');
      fetchCollections();
    };

    window.addEventListener('collectionsUpdated', handleCollectionsUpdate);

    //and Cleanup listener
    return () => {
      window.removeEventListener('collectionsUpdated', handleCollectionsUpdate);
    };
  }, [isAuthenticated, currentUser, getToken, navigate]);

  const handleRemoveFromCollection = async (collectionItemId) => {
    // IMPORTANT: Replace MOCK_USER_ID with an actual user ID from your database
    // This ID should come from your logged-in user object.
    const userId = currentUser?._id;
    const token = getToken();

    if (!userId || !token) {
        alert('Authentication error: User ID or token missing. Please log in again.');
        return;
    }

    try {
      await removeMenuItemFromCollection(userId, collectionItemId, token);
      setCollections(prevCollections =>
        prevCollections.filter(item => item._id !== collectionItemId)
      );
      setSuccessMessage('Item removed from collection!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const collectionListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  };

  if (!isAuthenticated && !loading) {
    return <div className="container margin-top-20">Please log in to view your collections.</div>;
  }

  return (
    <div style={containerStyle}>
      <h1>My Collections</h1>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {!loading && collections.length === 0 && !error && (
        <p className="text-center">You haven't added any items to your collection yet.</p>
      )}

      <div style={collectionListStyle}>
        {collections.map(item => (
          <CollectionItemCard 
          key={item._id} 
          item={item} 
          onRemoveFromCollection={handleRemoveFromCollection} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;