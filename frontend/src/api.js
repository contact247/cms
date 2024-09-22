// src/api.js

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// Check if BACKEND_URL is defined
if (!BACKEND_URL) {
  console.error('BACKEND_URL is not defined. Please check your .env file.');
}

// Log the full URL being used for debugging
console.log('Full API URL:', BACKEND_URL);

// Helper function to check if a string starts with 'http://' or 'https://'
// const hasProtocol = (url) => /^https?:\/\//i.test(url);

// // Ensure BACKEND_URL has a trailing slash
// const getBaseUrl = () => {
//   if (!BACKEND_URL) return '';
//   return BACKEND_URL.endsWith('/') ? BACKEND_URL : `${BACKEND_URL}/`;
// };

// Remove unused functions
// const hasProtocol = (url) => /^https?:\/\//i.test(url);

// const getBaseUrl = () => {
//   if (!BACKEND_URL) return '';
//   return BACKEND_URL.endsWith('/') ? BACKEND_URL : `${BACKEND_URL}/`;
// };


export const apiFetch = async (endpoint, options = {}) => {
  try {
    console.log(`${BACKEND_URL}${endpoint}`);
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    
    throw error;
  }
};
