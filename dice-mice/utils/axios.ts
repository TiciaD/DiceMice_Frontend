import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Set the base URL from environment variables
  withCredentials: true, // Ensures cookies are sent (if needed)
});

export default api;
