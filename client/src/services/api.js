import axios from 'axios';

const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token from localStorage if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('webind_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/admin/login')) {
        localStorage.removeItem('webind_admin_token');
        localStorage.removeItem('webind_admin_user');
        window.location.href = '/admin/login?expired=1';
      }
    }
    return Promise.reject(error);
  }
);

// ==========================================
// PUBLIC API
// ==========================================
export const brandsApi = {
  getPublicBrands: (params) => api.get('/api/brands', { params }).then((res) => res.data),
  getPublicBrand: (slug) => api.get(`/api/brands/${slug}`).then((res) => res.data),
};

export const settingsApi = {
  getPublicSettings: () => api.get('/api/settings').then((res) => res.data),
};

// ==========================================
// AUTH API
// ==========================================
export const authApi = {
  login: (credentials) => api.post('/api/auth/login', credentials).then((res) => res.data),
  getMe: () => api.get('/api/auth/me').then((res) => res.data),
  logout: () => api.post('/api/auth/logout').then((res) => res.data),
};

// ==========================================
// ADMIN API
// ==========================================
export const adminBrandsApi = {
  getAll: (params) => api.get('/api/admin/brands', { params }).then((res) => res.data),
  getById: (id) => api.get(`/api/admin/brands/${id}`).then((res) => res.data),
  create: (data) => api.post('/api/admin/brands', data).then((res) => res.data),
  update: (id, data) => api.put(`/api/admin/brands/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/api/admin/brands/${id}`).then((res) => res.data),
  updateStatus: (id, status) => api.patch(`/api/admin/brands/${id}/status`, { status }).then((res) => res.data),
  toggleFeatured: (id) => api.patch(`/api/admin/brands/${id}/featured`).then((res) => res.data),
  reorder: (items) => api.patch('/api/admin/brands/order', { items }).then((res) => res.data),
};

export const adminSettingsApi = {
  getDashboard: () => api.get('/api/admin/dashboard').then((res) => res.data),
  getSettings: () => api.get('/api/admin/settings').then((res) => res.data),
  updateSettings: (data) => api.put('/api/admin/settings', data).then((res) => res.data),
};

export const adminMediaApi = {
  getAll: (params) => api.get('/api/admin/media', { params }).then((res) => res.data),
  upload: (formData) =>
    api
      .post('/api/admin/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data),
  delete: (id) => api.delete(`/api/admin/media/${id}`).then((res) => res.data),
};

export const adminActivityApi = {
  getAll: (params) => api.get('/api/admin/activity', { params }).then((res) => res.data),
};

export default api;
