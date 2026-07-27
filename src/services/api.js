import axios from 'axios';

const API = axios.create({
  baseURL: 'https://gym-management-system-backend-2zp3.onrender.com', 
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('gym_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
