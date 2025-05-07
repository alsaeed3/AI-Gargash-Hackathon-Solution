import React from 'react';
import { render, screen, waitFor } from '../utils/test-utils';
import HomePage from '@/app/page';
import { apiClient } from '@/lib/api/client';

// Mock the API client
jest.mock('@/lib/api/client', () => ({
  apiClient: {
    cars: {
      getAll: jest.fn()
    }
  }
}));

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock successful API response
    (apiClient.cars.getAll as jest.Mock).mockResolvedValue({
      success: true,
      data: [
        {
          id: '1',
          brand: 'Mercedes',
          model: 'S-Class',
          year: 2023,
          price: 90000,
          bodyType: 'sedan',
          fuelType: 'gasoline',
          imageUrl: '/images/mercedes.jpg',
          description: 'Luxury sedan with premium features'
        },
        {
          id: '2',
          brand: 'BMW',
          model: 'X5',
          year: 2023,
          price: 75000,
          bodyType: 'suv',
          fuelType: 'hybrid',
          imageUrl: '/images/bmw.jpg',
          description: 'Premium SUV with hybrid technology'
        }
      ]
    });
  });

  test('renders homepage with title', async () => {
    render(<HomePage />);
    
    // Check for main heading or title
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  test('displays featured cars after loading', async () => {
    render(<HomePage />);
    
    // Wait for the API call to complete and cars to be displayed
    await waitFor(() => {
      expect(apiClient.cars.getAll).toHaveBeenCalled();
    });
    
    // Check for car cards/items
    await waitFor(() => {
      expect(screen.getByText('Mercedes')).toBeInTheDocument();
      expect(screen.getByText('BMW')).toBeInTheDocument();
    });
  });

  test('handles API error gracefully', async () => {
    // Mock API error
    (apiClient.cars.getAll as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch cars')
    );
    
    render(<HomePage />);
    
    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});