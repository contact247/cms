// src/api.js

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};
