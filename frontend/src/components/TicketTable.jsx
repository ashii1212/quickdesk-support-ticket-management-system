import React from 'react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { Eye, Trash2, HelpCircle, User } from 'lucide-react';

export default function TicketTable({
  tickets,
  isLoading,
  onStatusChange,
  onViewTicket,
  onDeleteTicket,
  onOpenCreateModal
}) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="table-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ color: 'var(--text-muted)' }}>Loading tickets...</div>
      </div>
    );
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="table-card empty-state">
        <div className="empty-icon">
          <HelpCircle size={28} />
        </div>
        <h3 className="empty-title">No tickets found</h3>
        <p className="empty-desc">
          No support tickets matched your search or active filters. Try adjusting your query or create a new ticket.
        </p>
        <button className="btn btn-primary btn-sm" onClick={onOpenCreateModal}>
          Create New Ticket
        </button>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-responsive">
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Customer</th>
              <th>Issue Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>
                  <span className="ticket-code">{ticket.ticketCode || `QD-${ticket.id}`}</span>
                </td>

                <td>
                  <div className="customer-name">{ticket.customerName}</div>
                  <div className="customer-email">{ticket.customerEmail}</div>
                </td>

                <td className="ticket-title-cell">
                  <div className="ticket-title-text" title={ticket.title}>
                    {ticket.title}
                  </div>
                  <div className="ticket-desc-snippet" title={ticket.description}>
                    {ticket.description}
                  </div>
                </td>

                <td>
                  <span className="badge badge-category">
                    {ticket.category}
                  </span>
                </td>

                <td>
                  <PriorityBadge priority={ticket.priority} />
                </td>

                <td>
                  {/* Inline Status Changer */}
                  <select
                    className="status-select-inline"
                    value={ticket.status}
                    onChange={(e) => onStatusChange(ticket.id, e.target.value)}
                    title="Change ticket status"
                    aria-label={`Change status for ticket ${ticket.ticketCode}`}
                  >
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                  </select>
                </td>

                <td style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  {formatDate(ticket.createdAt)}
                </td>

                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onViewTicket(ticket)}
                      title="View Details"
                      style={{ padding: '0.35rem 0.6rem' }}
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDeleteTicket(ticket.id)}
                      title="Delete Ticket"
                      style={{ padding: '0.35rem 0.6rem' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
