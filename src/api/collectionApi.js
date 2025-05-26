// src/api/collectionApi.js
import API_BASE_URL from './base';

export const getUserCollections = async (userId, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}/collections`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch collections');
        }
        return data;
    } catch (error) {
        console.error('Error fetching user collections:', error);
        throw error;
    }
};

export const addMenuItemToCollection = async (userId, menuItemId, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}/collections`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ menuItemId }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to add item to collection');
        }
        return data;
    } catch (error) {
        console.error('Error adding item to collection:', error);
        throw error;
    }
};

export const removeMenuItemFromCollection = async (userId, collectionItemId, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}/collections/${collectionItemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to remove item from collection');
        }
        return data;
    } catch (error) {
        console.error('Error removing item from collection:', error);
        throw error;
    }
};