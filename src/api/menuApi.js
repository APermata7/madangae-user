// src/api/menuApi.js
import API_BASE_URL from './base';

export const getMenus = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/menus`);
        if (!response.ok) {
            throw new Error('Failed to fetch menus');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching menus:', error);
        throw error;
    }
};

export const getMenuById = async (menuId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/menus/${menuId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch menu');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching menu by ID:', error);
        throw error;
    }
};