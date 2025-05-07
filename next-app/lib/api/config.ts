// API configuration

// Get API base URL from environment variables or use default
export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000/api';

// API endpoints
export const API_ENDPOINTS = {
  // Cars
  CARS: `${API_BASE_URL}/cars`,
  CAR_DETAIL: (id: string) => `${API_BASE_URL}/cars/${id}`,
  
  // Authentication
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  
  // Appointments
  APPOINTMENTS: `${API_BASE_URL}/appointments`,
  APPOINTMENT_DETAIL: (id: string) => `${API_BASE_URL}/appointments/${id}`,
  
  // AI Assistant
  AI: `${API_BASE_URL}/ai`,
};