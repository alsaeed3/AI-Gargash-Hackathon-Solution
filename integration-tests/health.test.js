const axios = require('axios');

// Configuration
const API_URL = process.env.API_URL || 'http://localhost:8000';

// Setup axios instance
const api = axios.create({
  baseURL: API_URL,
  validateStatus: null // Don't throw errors for non-200 status codes
});

describe('Health Check Tests', () => {
  // Test that the API server is healthy
  test('API Health Check', async () => {
    const response = await api.get('/api/health');
    expect(response.status).toBe(200);
    expect(response.data.status).toBe('healthy');
    expect(response.data.services.api).toBe('up');
    
    // Database connection is also expected to be successful
    expect(response.data.services.database).toBe('up');
  });
});