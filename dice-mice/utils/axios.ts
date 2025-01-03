import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Set the base URL from environment variables,
});

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      const isTokenExpired = () => {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 <= Date.now();
      };

      if (isTokenExpired()) {
        // Redirect to logged out page if token is expired
        window.location.href = '/loggedout';
        return Promise.reject(new Error('Token expired'));
      }

      // Attach token to request headers
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
