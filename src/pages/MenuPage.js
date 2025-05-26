// src/pages/MenuPage.js
import React, { useState, useEffect } from 'react';
import MenuItemCard from '../components/menu/MenuItemCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { getMenus } from '../api/menuApi';
import { addMenuItemToCollection } from '../api/collectionApi';
import { useAuth } from '../contexts/AuthContext';

const MenuPage = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { isAuthenticated, currentUser, getToken } = useAuth();

  useEffect(() => {
    const fetchMenus = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMenus(); // This fetches menus
        setMenus(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  const handleAddToCollection = async (menuItemId) => {
    if (!isAuthenticated) {
      alert('Please log in to add items to your collection.');
      return;
    }

    const userId = currentUser?._id;
    const token = getToken();

    if (!userId || !token) {
        alert('Authentication error: User ID or token missing. Please log in again.');
        return;
    }

    try {
      // This line is correct as long as menuItemId is the correct _id from the fetched menu item
      await addMenuItemToCollection(userId, menuItemId, token);
      setSuccessMessage('Item added to collection!');
      setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3 seconds
    } catch (err) {
      setError(err.message);
    }
  };

  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const menuListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  };

  return (
    <div style={containerStyle}>
      <h1>Our Menu</h1>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div style={menuListStyle}>
        {menus.map(menu => (
          // The key and item prop are correct; menuItem._id is passed to handleAddToCollection
          <MenuItemCard key={menu._id} item={menu} onAddToCollection={handleAddToCollection} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;