/**
 * API communication functions for FURA website
 * These functions would connect to a backend server in a real application
 */

// Base API URL (would be a real API endpoint in production)
const API_BASE_URL = 'https://api.fura.example';

// Get authentication token from localStorage
function getAuthToken() {
    return localStorage.getItem('authToken');
}

// Set authentication token in localStorage
function setAuthToken(token) {
    localStorage.setItem('authToken', token);
}

// Clear authentication token (for logout)
function clearAuthToken() {
    localStorage.removeItem('authToken');
}

// Check if user is authenticated
function isAuthenticated() {
    return !!getAuthToken();
}

// Handle API errors
function handleApiError(error) {
    console.error('API Error:', error);
    
    if (error.status === 401) {
        // Unauthorized - clear token and redirect to login
        clearAuthToken();
        window.location.href = '/pages/login.html';
    }
    
    return Promise.reject(error);
}

// Make authenticated API request
async function apiRequest(endpoint, method = 'GET', data = null) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
        'Content-Type': 'application/json'
    };
    
    // Add auth token if available
    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const options = {
        method,
        headers
    };
    
    // Add request body for POST/PUT requests
    if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw {
                status: response.status,
                message: response.statusText
            };
        }
        
        return await response.json();
    } catch (error) {
        return handleApiError(error);
    }
}

// API Functions for Authentication

// Login user
async function loginUser(username, password) {
    const data = { username, password };
    
    try {
        const response = await apiRequest('/auth/login', 'POST', data);
        
        if (response.token) {
            setAuthToken(response.token);
            return { success: true, user: response.user };
        }
        
        return { success: false, message: 'Prijava ni uspela.' };
    } catch (error) {
        return { success: false, message: error.message || 'Napaka pri prijavi.' };
    }
}

// Register user
async function registerUser(userData) {
    try {
        const response = await apiRequest('/auth/register', 'POST', userData);
        
        return { success: true, message: 'Registracija uspešna!' };
    } catch (error) {
        return { success: false, message: error.message || 'Napaka pri registraciji.' };
    }
}

// Logout user
function logoutUser() {
    clearAuthToken();
    window.location.href = '/index.html';
}

// API Functions for Rides

// Get all rides with optional filtering
async function getRides(filters = {}) {
    // Convert filters object to query string
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = `/rides?${queryParams}`;
    
    try {
        return await apiRequest(endpoint);
    } catch (error) {
        return [];
    }
}

// Get a single ride by ID
async function getRideById(rideId) {
    try {
        return await apiRequest(`/rides/${rideId}`);
    } catch (error) {
        return null;
    }
}

// Create a new ride
async function createRide(rideData) {
    try {
        return await apiRequest('/rides', 'POST', rideData);
    } catch (error) {
        return { success: false, message: error.message || 'Napaka pri ustvarjanju prevoza.' };
    }
}

// Update an existing ride
async function updateRide(rideId, rideData) {
    try {
        return await apiRequest(`/rides/${rideId}`, 'PUT', rideData);
    } catch (error) {
        return { success: false, message: error.message || 'Napaka pri posodabljanju prevoza.' };
    }
}

// Delete a ride
async function deleteRide(rideId) {
    try {
        await apiRequest(`/rides/${rideId}`, 'DELETE');
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message || 'Napaka pri brisanju prevoza.' };
    }
}

// API Functions for User Profile

// Get current user profile
async function getUserProfile() {
    try {
        return await apiRequest('/user/profile');
    } catch (error) {
        return null;
    }
}

// Update user profile
async function updateUserProfile(profileData) {
    try {
        return await apiRequest('/user/profile', 'PUT', profileData);
    } catch (error) {
        return { success: false, message: error.message || 'Napaka pri posodabljanju profila.' };
    }
}

// Get rides created by the current user
async function getUserRides() {
    try {
        return await apiRequest('/user/rides');
    } catch (error) {
        return [];
    }
}