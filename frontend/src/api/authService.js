// Auth Service for QuickDesk
const AUTH_URL = 'http://localhost:8080/api/auth';
const STORAGE_KEY = 'quickdesk_user_session';

export const authService = {
  // Login with email and password
  async login(email, password) {
    const res = await fetch(`${AUTH_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = data.fieldErrors
        ? Object.values(data.fieldErrors).join(', ')
        : (data.message || 'Login failed. Please check credentials.');
      throw new Error(msg);
    }
    this.saveSession(data);
    return data;
  },

  // Register a new support staff user
  async register(name, email, password, role = 'SUPPORT_AGENT') {
    const res = await fetch(`${AUTH_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = data.fieldErrors
        ? Object.values(data.fieldErrors).join(', ')
        : (data.message || 'Registration failed.');
      throw new Error(msg);
    }
    this.saveSession(data);
    return data;
  },

  // Save session in localStorage
  saveSession(authData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
  },

  // Get current user session
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  // Clear session
  logout() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
