// src/api/authApi.js
import API_BASE_URL from './base';

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        return data; // Should contain user object and token
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const signupUser = async (username, email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Signup failed');
        }
        return data; // Should contain user object and token
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

// Add logout if your backend supports a specific logout endpoint
// For now, logout is handled by clearing client-side token/state.