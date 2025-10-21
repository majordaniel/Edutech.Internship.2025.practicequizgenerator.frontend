import axios from 'axios';
// import dotenv from 'dotenv';

// Load environment variables
// dotenv.config();
// Get API base URL from environment variable
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

console.log('API Base URL:', API_BASE_URL); // Debug log to verify URL



// Create axios instance with base configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increased timeout for network requests
  headers: {
    'Content-Type': 'application/json',
  },
  // Add withCredentials if backend requires it
  withCredentials: false,
});

// Request interceptor to add auth token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Making request to:', config.baseURL + config.url); // Debug log
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error.response || error);
    
    if (error.response?.status === 401) {
      // Token expired or invalid, clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userData');
      // Optionally redirect to login
      window.location.href = '/login';
    }
    
    // Better error messages
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - check if backend is running and CORS is configured');
    }
    
    return Promise.reject(error);
  }
);

// API service functions
export const authAPI = {
  login: (credentials) => api.post('/api/Auth/login', credentials),
  register: (userData) => api.post('/api/Auth/register', userData),
  refresh: (refreshToken) => api.post('/api/Auth/refresh', { refreshToken }),
};

export const userAPI = {
  getByEmail: (email) => api.get('/api/User/email', { params: { email } }),
  getById: (id) => api.get('/api/User/id', { params: { id } }),
  getAll: () => api.get('/api/User'),
};

export const quizAPI = {
  generateFromFile: (formData) => api.post('/api/Quiz/generatefromfile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  createFromFilePersist: (formData) => api.post('/api/Quiz/createfromfile/persist', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getById: (id) => api.get(`/api/Quiz/${id}`),
  getUserQuizzes: (userId) => api.get(`/api/Quiz/user/${userId}`),
  getDetails: (quizId) => api.get(`/api/Quiz/${quizId}/details`),
  submit: (quizData) => api.post('/api/Quiz/submit', quizData),
  getHistory: () => api.get('/api/Quiz/history'),
};

export const llmAPI = {
  chat: (prompt) => api.post('/api/LLM/chat', prompt),
};

export const departmentAPI = {
  getAll: () => api.get('/api/Department'),
  getById: (id) => api.get(`/api/Department/${id}`),
};

export const facultyAPI = {
  getAll: () => api.get('/api/Faculty'),
  getById: (id) => api.get(`/api/Faculty/${id}`),
};

export const courseAPI = {
  getAll: () => api.get('/api/Course'),
  getById: (id) => api.get(`/api/Course/${id}`),
};

export const studentCourseAPI = {
  getAll: () => api.get('/api/StudentCourse'),
  getById: (id) => api.get(`/api/StudentCourse/${id}`),
};

export default api;