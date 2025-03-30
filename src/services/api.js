import axios from 'axios';
import { projects as mockProjects, certificates as mockCertificates, comments as mockComments } from '../mockData';

// Check if mock API mode is enabled
const useMockData = import.meta.env.VITE_MOCK_API === 'true';

// Use environment variables for API URL, or fallback to local development URL
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

// Create axios instance with proper configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    return Promise.reject(error);
  }
);

// Project API calls
export const getProjects = async () => {
  if (useMockData) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockProjects), 500);
    });
  }
  
  try {
    const response = await apiClient.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return mockProjects; // Fallback to mock data on error
  }
};

export const getProjectById = async (id) => {
  if (useMockData) {
    return new Promise(resolve => {
      const project = mockProjects.find(p => p._id === id);
      setTimeout(() => resolve(project || null), 500);
    });
  }
  
  try {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    return mockProjects.find(p => p._id === id) || null;
  }
};

export const createProject = async (projectData) => {
  if (useMockData) {
    return new Promise(resolve => {
      const newProject = {
        _id: String(mockProjects.length + 1),
        ...projectData,
        createdAt: new Date().toISOString()
      };
      mockProjects.push(newProject);
      setTimeout(() => resolve(newProject), 500);
    });
  }
  
  try {
    const response = await apiClient.post('/projects', projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Certificate API calls
export const getCertificates = async () => {
  if (useMockData) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockCertificates), 500);
    });
  }
  
  try {
    const response = await apiClient.get('/certificates');
    return response.data;
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return mockCertificates;
  }
};

export const getCertificateById = async (id) => {
  if (useMockData) {
    return new Promise(resolve => {
      const certificate = mockCertificates.find(c => c._id === id);
      setTimeout(() => resolve(certificate || null), 500);
    });
  }
  
  try {
    const response = await apiClient.get(`/certificates/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching certificate with id ${id}:`, error);
    return mockCertificates.find(c => c._id === id) || null;
  }
};

// Comment API calls
export const getComments = async () => {
  if (useMockData) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockComments), 500);
    });
  }
  
  try {
    const response = await apiClient.get('/comments');
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return mockComments;
  }
};

export const createComment = async (commentData) => {
  if (useMockData) {
    return new Promise(resolve => {
      const newComment = {
        _id: String(mockComments.length + 1),
        content: commentData.content,
        userName: commentData.userName,
        date: new Date().toISOString(),
        profileImage: commentData.imageFile ? URL.createObjectURL(commentData.imageFile) : 'https://i.ibb.co/ZfCZrGT/default-avatar.jpg'
      };
      mockComments.push(newComment);
      setTimeout(() => resolve(newComment), 500);
    });
  }
  
  try {
    // Create FormData for file upload
    const formData = new FormData();
    
    // Append text fields
    formData.append('content', commentData.content);
    formData.append('userName', commentData.userName);
    
    // Append file if it exists
    if (commentData.imageFile) {
      formData.append('profileImage', commentData.imageFile);
    }
    
    const response = await apiClient.post('/comments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const deleteComment = async (id) => {
  if (useMockData) {
    return new Promise(resolve => {
      const index = mockComments.findIndex(c => c._id === id);
      if (index !== -1) {
        mockComments.splice(index, 1);
      }
      setTimeout(() => resolve({ success: true }), 500);
    });
  }
  
  try {
    const response = await apiClient.delete(`/comments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting comment with id ${id}:`, error);
    throw error;
  }
}; 