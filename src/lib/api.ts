const API_BASE_URL = 'http://localhost:5005/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, errorData.message || 'An error occurred');
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, 'Network error occurred');
  }
}

export const api = {
  // Auth endpoints
  register: (data: any) => request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  login: (data: any) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getMe: () => request('/auth/me'),
  
  updateProfile: (data: any) => request('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Product endpoints
  getProducts: () => request('/products'),
  
  getProduct: (id: string) => request(`/products/${id}`),
  
  searchProducts: (query: string) => request(`/products/search/${query}`),
  
  createProduct: (data: any) => request('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  updateProduct: (id: string, data: any) => request(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  deleteProduct: (id: string) => request(`/products/${id}`, {
    method: 'DELETE',
  }),

  // Order endpoints
  createOrder: (data: any) => request('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getMyOrders: () => request('/orders/my-orders'),
  
  getAllOrders: () => request('/orders'),
  
  updateOrderStatus: (id: string, status: string) => request(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),

  // Admin endpoints
  getUsers: () => request('/admin/users'),
  
  updateUserRole: (id: string, role: string) => request(`/admin/users/${id}/role`, {
    method: 'PUT',
    body: JSON.stringify({ role }),
  }),
};

export { ApiError };