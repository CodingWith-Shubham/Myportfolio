import axios from 'axios';

// Use environment variables for API URL, or fallback to local development URL
// This will allow the frontend to connect to the deployed backend
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

// Project API calls
export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Certificate API calls
export const getCertificates = async () => {
  try {
    const response = await axios.get(`${API_URL}/certificates`);
    return response.data;
  } catch (error) {
    console.error('Error fetching certificates:', error);
    throw error;
  }
};

export const getCertificateById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/certificates/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching certificate with id ${id}:`, error);
    throw error;
  }
};

export const createCertificate = async (certificateData) => {
  try {
    const response = await axios.post(`${API_URL}/certificates`, certificateData);
    return response.data;
  } catch (error) {
    console.error('Error creating certificate:', error);
    throw error;
  }
};

// Comment API calls
export const getComments = async () => {
  try {
    const response = await axios.get(`${API_URL}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const createComment = async (commentData) => {
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
    
    const response = await axios.post(`${API_URL}/comments`, formData, {
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
  try {
    const response = await axios.delete(`${API_URL}/comments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting comment with id ${id}:`, error);
    throw error;
  }
}; 