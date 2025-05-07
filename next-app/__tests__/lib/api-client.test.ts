import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';

// Mock the global fetch function
global.fetch = jest.fn();

describe('API Client', () => {
  beforeEach(() => {
    // Reset mock before each test
    jest.resetAllMocks();
  });

  describe('cars API', () => {
    test('getAll fetches cars correctly', async () => {
      // Mock successful response
      const mockCars = [{ id: '1', brand: 'Mercedes', model: 'S-Class' }];
      const mockResponse = { success: true, data: mockCars };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        headers: { get: () => 'application/json' },
        json: async () => mockResponse
      });

      const result = await apiClient.cars.getAll();
      
      expect(global.fetch).toHaveBeenCalledWith(
        API_ENDPOINTS.CARS,
        expect.objectContaining({
          method: 'GET',
          credentials: 'include'
        })
      );
      expect(result).toEqual(mockResponse);
    });

    test('getById fetches a specific car correctly', async () => {
      const carId = '123';
      const mockCar = { id: carId, brand: 'BMW', model: 'X5' };
      const mockResponse = { success: true, data: mockCar };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        headers: { get: () => 'application/json' },
        json: async () => mockResponse
      });

      const result = await apiClient.cars.getById(carId);
      
      expect(global.fetch).toHaveBeenCalledWith(
        API_ENDPOINTS.CAR_DETAIL(carId),
        expect.objectContaining({
          method: 'GET',
          credentials: 'include'
        })
      );
      expect(result).toEqual(mockResponse);
    });

    test('create sends the correct data', async () => {
      const newCar = {
        brand: 'Audi',
        model: 'A8',
        year: 2023,
        price: 85000
      };
      const mockResponse = { success: true, data: { id: '123', ...newCar } };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        headers: { get: () => 'application/json' },
        json: async () => mockResponse
      });

      const result = await apiClient.cars.create(newCar);
      
      expect(global.fetch).toHaveBeenCalledWith(
        API_ENDPOINTS.CARS,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newCar),
          credentials: 'include'
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('auth API', () => {
    test('login sends correct data', async () => {
      const loginData = { email: 'test@example.com' };
      const mockResponse = {
        success: true,
        data: {
          user: { id: '123', name: 'Test User', email: 'test@example.com' }
        }
      };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        headers: { get: () => 'application/json' },
        json: async () => mockResponse
      });

      const result = await apiClient.auth.login(loginData);
      
      expect(global.fetch).toHaveBeenCalledWith(
        API_ENDPOINTS.LOGIN,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(loginData),
          credentials: 'include'
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('appointments API', () => {
    test('create appointment sends correct data', async () => {
      const appointmentData = {
        appointmentType: 'test-drive',
        appointmentDate: '2025-05-20T14:00:00Z',
        carId: '123',
        contactDetails: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890'
        }
      };
      const mockResponse = { success: true, data: { id: '456', ...appointmentData } };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        headers: { get: () => 'application/json' },
        json: async () => mockResponse
      });

      const result = await apiClient.appointments.create(appointmentData);
      
      expect(global.fetch).toHaveBeenCalledWith(
        API_ENDPOINTS.APPOINTMENTS,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(appointmentData),
          credentials: 'include'
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('error handling', () => {
    test('handles API errors correctly', async () => {
      const errorMessage = 'Something went wrong';
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        headers: { get: () => 'application/json' },
        json: async () => ({ success: false, message: errorMessage })
      });

      await expect(apiClient.cars.getAll()).rejects.toThrow(errorMessage);
    });
  });
});