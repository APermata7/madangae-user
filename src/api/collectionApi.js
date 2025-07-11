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
        // Trigger a custom event to refresh collections
        window.dispatchEvent(new CustomEvent('collectionsUpdated'));

        return data;
    } catch (error) {
        console.error('Error adding item to collection:', error);
        throw error;
    }
};

//
export const removeMenuItemFromCollection = async (userId, menuItemId, token) => {
       try {
        console.log('Removing menu item:', { userId, menuItemId });
        
        const response = await fetch(`${API_BASE_URL}/users/${userId}/collections/${menuItemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            console.error('Remove failed:', data);
            throw new Error(data.message || 'Failed to remove item from collection');
        }
        
        console.log('Remove success:', data);
        
        // Trigger refresh
        window.dispatchEvent(new CustomEvent('collectionsUpdated'));
        
        return data;
    } catch (error) {
        console.error('Error removing item from collection:', error);
        throw error;
    }
};