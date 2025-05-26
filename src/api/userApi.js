// src/api/userApi.js
import API_BASE_URL from './base';

export const getUserProfile = async (userId, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch user profile');
        }
        return data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const updateUserProfile = async (userId, updatedData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update user profile');
        }
        return data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};