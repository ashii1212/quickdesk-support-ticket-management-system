// API Client for QuickDesk Backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BASE_URL = `${API_BASE_URL}/api/tickets`;
export const ticketService = {
  // Get all tickets with optional search and filters
  async getTickets({ search = '', status = '', priority = '', category = '' } = {}) {
    const params = new URLSearchParams();
    if (search && search.trim()) params.append('search', search.trim());
    if (status) params.append('status', status);
    if (priority) params.append('priority', priority);
    if (category) params.append('category', category);

    const url = params.toString() ? `${BASE_URL}?${params.toString()}` : BASE_URL;
    const res = await fetch(url);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch tickets');
    }
    return res.json();
  },

  // Get summary counts for dashboard
  async getDashboardStats() {
    const res = await fetch(`${BASE_URL}/dashboard/stats`);
    if (!res.ok) {
      throw new Error('Failed to fetch dashboard metrics');
    }
    return res.json();
  },

  // Create a new support ticket
  async createTicket(ticketData) {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticketData)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = data.fieldErrors
        ? Object.values(data.fieldErrors).join(', ')
        : (data.message || 'Failed to create ticket');
      throw new Error(msg);
    }
    return data;
  },

  // Update ticket status (OPEN, IN_PROGRESS, RESOLVED)
  async updateTicketStatus(id, newStatus) {
    const res = await fetch(`${BASE_URL}/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to update ticket status');
    }
    return res.json();
  },

  // Delete ticket
  async deleteTicket(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      throw new Error('Failed to delete ticket');
    }
    return true;
  }
};
