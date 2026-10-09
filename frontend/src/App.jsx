import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import FilterBar from './components/FilterBar';
import TicketTable from './components/TicketTable';
import CreateTicketModal from './components/CreateTicketModal';
import TicketDetailModal from './components/TicketDetailModal';
import { ticketService } from './api/ticketService';
import { Check, AlertCircle } from 'lucide-react';

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({ totalTickets: 0, openTickets: 0, inProgressTickets: 0, resolvedTickets: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState(null);

  // Notifications
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Fetch Dashboard Metrics
  const loadStats = useCallback(async () => {
    try {
      const data = await ticketService.getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  }, []);

  // Fetch Tickets
  const loadTickets = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await ticketService.getTickets({ search, status, priority, category });
      setTickets(data);
    } catch (err) {
      console.error('Error loading tickets:', err);
      addToast(err.message || 'Failed to load tickets', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [search, status, priority, category]);

  // Load tickets and stats whenever search or filters change
  useEffect(() => {
    const timeout = setTimeout(() => {
      loadTickets();
    }, 200); // 200ms debounce
    return () => clearTimeout(timeout);
  }, [loadTickets]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Handle Status Update
  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      const updated = await ticketService.updateTicketStatus(ticketId, newStatus);
      // Update local ticket list
      setTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? { ...t, status: updated.status, updatedAt: updated.updatedAt } : t))
      );
      if (activeTicket && activeTicket.id === ticketId) {
        setActiveTicket((prev) => ({ ...prev, status: updated.status, updatedAt: updated.updatedAt }));
      }
      addToast(`Ticket ${updated.ticketCode} status changed to ${newStatus.replace('_', ' ')}`);
      loadStats();
    } catch (err) {
      addToast(err.message || 'Failed to change status', 'error');
    }
  };

  // Handle Create Ticket
  const handleCreateTicket = async (ticketData) => {
    const created = await ticketService.createTicket(ticketData);
    addToast(`Ticket ${created.ticketCode} created successfully!`);
    loadTickets();
    loadStats();
  };

  // Handle Delete Ticket
  const handleDeleteTicket = async (ticketId) => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) return;
    try {
      await ticketService.deleteTicket(ticketId);
      addToast('Ticket deleted successfully');
      loadTickets();
      loadStats();
    } catch (err) {
      addToast(err.message || 'Failed to delete ticket', 'error');
    }
  };

  // Handle Filter Reset
  const handleResetFilters = () => {
    setSearch('');
    setStatus('');
    setPriority('');
    setCategory('');
  };

  return (
    <div className="app-container">
      <Navbar onOpenCreateModal={() => setIsCreateOpen(true)} />

      <main className="main-content">
        {/* Dashboard Summary Cards */}
        <DashboardStats
          stats={stats}
          selectedStatus={status}
          onSelectStatus={(s) => setStatus(s)}
        />

        {/* Search & Multi-Filters */}
        <FilterBar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          priority={priority}
          setPriority={setPriority}
          category={category}
          setCategory={setCategory}
          onResetFilters={handleResetFilters}
          totalResults={tickets.length}
        />

        {/* Tickets Table */}
        <TicketTable
          tickets={tickets}
          isLoading={isLoading}
          onStatusChange={handleStatusChange}
          onViewTicket={(ticket) => setActiveTicket(ticket)}
          onDeleteTicket={handleDeleteTicket}
          onOpenCreateModal={() => setIsCreateOpen(true)}
        />
      </main>

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmitSuccess={handleCreateTicket}
      />

      {/* Ticket Details Modal */}
      {activeTicket && (
        <TicketDetailModal
          ticket={activeTicket}
          onClose={() => setActiveTicket(null)}
          onStatusChange={handleStatusChange}
          onDeleteTicket={handleDeleteTicket}
        />
      )}

      {/* Toast Notification Stack */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}
          >
            {toast.type === 'error' ? <AlertCircle size={18} /> : <Check size={18} />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
