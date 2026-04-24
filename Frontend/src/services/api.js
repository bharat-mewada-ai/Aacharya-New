// API Service - Backend Connection
const BASE_URL = import.meta.env.VITE_API_URL || 'https://aacharya-1.onrender.com/api';

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: async (userData) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Registration failed');
    return res.json();
  },

  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
    const data = await res.json();
    // Store token
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userId', data.user._id);
    return data;
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  },

  getToken: () => localStorage.getItem('authToken'),
  getUserId: () => localStorage.getItem('userId'),
  isLoggedIn: () => !!localStorage.getItem('authToken'),
};

// ─── Authenticated fetch ──────────────────────────────────────────────────────
const authFetch = async (url, options = {}) => {
  const token = authAPI.getToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (res.status === 401) {
    authAPI.logout();
    window.location.href = '/';
  }
  if (!res.ok) throw new Error((await res.json()).error || 'Request failed');
  return res.json();
};

// ─── Users ───────────────────────────────────────────────────────────────────
export const usersAPI = {
  getProfile: (userId) => authFetch(`${BASE_URL}/users/${userId}`),

  updateProfile: (userId, data) =>
    authFetch(`${BASE_URL}/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  updateXP: (userId, xp) =>
    authFetch(`${BASE_URL}/users/${userId}/xp`, {
      method: 'PATCH',
      body: JSON.stringify({ xp }),
    }),

  updateStreak: (userId, streak) =>
    authFetch(`${BASE_URL}/users/${userId}/streak`, {
      method: 'PATCH',
      body: JSON.stringify({ streak }),
    }),
};

// ─── Missions ─────────────────────────────────────────────────────────────────
export const missionsAPI = {
  getAll: (userId) => authFetch(`${BASE_URL}/missions/${userId}`),

  complete: (userId, missionId) =>
    authFetch(`${BASE_URL}/missions/${userId}/complete`, {
      method: 'POST',
      body: JSON.stringify({ missionId }),
    }),
};

// ─── Chat ─────────────────────────────────────────────────────────────────────
export const chatAPI = {
  sendMessage: async (message) => {
    const res = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Chat request failed');
    return res.json();
  },
};

// ─── Health Check ─────────────────────────────────────────────────────────────
export const healthCheck = async () => {
  try {
    const res = await fetch('http://localhost:5000/health');
    return res.ok;
  } catch {
    return false;
  }
};
