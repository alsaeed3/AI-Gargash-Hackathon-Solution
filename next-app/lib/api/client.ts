import { API_ENDPOINTS } from './config';

/**
 * API client for making requests to the backend
 */
export const apiClient = {
  // Generic request method
  async request<T>(
    url: string,
    method: string = 'GET',
    data: any = null,
    headers: Record<string, string> = {}
  ): Promise<T> {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials: 'include', // Include cookies for auth
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }
      
      return result;
    }
    
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    
    return {} as T;
  },

  // Cars API
  cars: {
    getAll: async (params?: URLSearchParams) => {
      const queryString = params ? `?${params.toString()}` : '';
      return apiClient.request(`${API_ENDPOINTS.CARS}${queryString}`);
    },
    getById: async (id: string) => {
      return apiClient.request(API_ENDPOINTS.CAR_DETAIL(id));
    },
    create: async (data: any) => {
      return apiClient.request(API_ENDPOINTS.CARS, 'POST', data);
    },
    update: async (id: string, data: any) => {
      return apiClient.request(API_ENDPOINTS.CAR_DETAIL(id), 'PUT', data);
    },
    delete: async (id: string) => {
      return apiClient.request(API_ENDPOINTS.CAR_DETAIL(id), 'DELETE');
    }
  },

  // Auth API
  auth: {
    login: async (data: { email: string }) => {
      return apiClient.request(API_ENDPOINTS.LOGIN, 'POST', data);
    },
    register: async (data: { name: string; email: string; phone?: string }) => {
      return apiClient.request(API_ENDPOINTS.REGISTER, 'POST', data);
    },
    logout: async () => {
      return apiClient.request(API_ENDPOINTS.LOGOUT, 'POST');
    }
  },

  // Appointments API
  appointments: {
    getAll: async (params?: URLSearchParams) => {
      const queryString = params ? `?${params.toString()}` : '';
      return apiClient.request(`${API_ENDPOINTS.APPOINTMENTS}${queryString}`);
    },
    getById: async (id: string) => {
      return apiClient.request(API_ENDPOINTS.APPOINTMENT_DETAIL(id));
    },
    create: async (data: any) => {
      return apiClient.request(API_ENDPOINTS.APPOINTMENTS, 'POST', data);
    },
    update: async (id: string, data: any) => {
      return apiClient.request(API_ENDPOINTS.APPOINTMENT_DETAIL(id), 'PUT', data);
    },
    delete: async (id: string) => {
      return apiClient.request(API_ENDPOINTS.APPOINTMENT_DETAIL(id), 'DELETE');
    }
  },

  // AI Assistant API
  ai: {
    chat: async (message: string, userId?: string) => {
      return apiClient.request(API_ENDPOINTS.AI, 'POST', { message, userId });
    }
  }
};