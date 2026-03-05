// frontend/src/lib/api.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/';

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('accessToken');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  // Construir URL con query params
  let url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`;
  if (options.params) {
    const searchParams = new URLSearchParams(options.params);
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      const existingToken = localStorage.getItem('accessToken');
      // Solo redirigir si hay un token previo (sesión expirada), no en el login
      if (existingToken) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      throw new Error('Credenciales incorrectas o sesión expirada.');
    }

    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Error ${response.status}`);
  }

  if (response.status === 204) return null;

  return response.json();
};