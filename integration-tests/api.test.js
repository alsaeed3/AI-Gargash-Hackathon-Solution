const axios = require('axios');

// Configuration
const API_URL = process.env.API_URL || 'http://localhost:8000';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Setup axios instance
const api = axios.create({
  baseURL: API_URL,
  validateStatus: null // Don't throw errors for non-200 status codes
});

describe('API Integration Tests', () => {
  // Test that the API server is running
  test('API server is running', async () => {
    const response = await api.get('/');
    expect(response.status).toBe(200);
  });

  // Test cars endpoint
  describe('Cars API', () => {
    test('GET /api/cars returns cars list', async () => {
      const response = await api.get('/api/cars');
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.data)).toBe(true);
    });

    test('Cars API supports filtering', async () => {
      const response = await api.get('/api/cars?brand=Mercedes');
      expect(response.status).toBe(200);
      
      // If any cars match the filter, verify they're Mercedes
      if (response.data.data.length > 0) {
        response.data.data.forEach(car => {
          expect(car.brand).toBe('Mercedes');
        });
      }
    });
  });

  // Test auth endpoints
  describe('Authentication API', () => {
    let testEmail = `test-${Date.now()}@example.com`;

    test('User registration works', async () => {
      const userData = {
        name: 'Integration Test User',
        email: testEmail,
        phone: '1234567890'
      };
      
      const response = await api.post('/api/auth/register', userData);
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.user.email).toBe(testEmail);
    });

    test('User login works', async () => {
      const response = await api.post('/api/auth/login', { email: testEmail });
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.user.email).toBe(testEmail);
    });
  });

  // Test AI assistant endpoint
  describe('AI Assistant API', () => {
    test('AI responds to car recommendations', async () => {
      const response = await api.post('/api/ai', { 
        message: 'Recommend me a luxury sedan' 
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.text).toBeTruthy();
      
      // If recommendations are included, check they're in correct format
      if (response.data.data.recommendations) {
        expect(Array.isArray(response.data.data.recommendations)).toBe(true);
      }
    });
  });
});