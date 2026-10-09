import React from 'react';
import { X, Calendar, User, Mail, Tag, AlertCircle } from 'lucide-react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

export default function TicketDetailModal({
  ticket,
  onClose,
  onStatusChange,
  onDeleteTicket
}) {
  if (!ticket) return null;

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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="ticket-code">{ticket.ticketCode || `QD-${ticket.id}`}</span>
              <StatusBadge status={ticket.status} />
              <PriorityBadge priority={ticket.priority} />
            </div>
            <h2 className="modal-title">{ticket.title}</h2>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            title="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Customer info card */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              marginBottom: '1.25rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <User size={13} /> CUSTOMER NAME
              </div>
              <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>{ticket.customerName}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Mail size={13} /> EMAIL ADDRESS
              </div>
              <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>{ticket.customerEmail}</div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              ISSUE DESCRIPTION
            </div>
            <div
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap'
              }}
            >
              {ticket.description}
            </div>
          </div>

          {/* Metadata Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
              fontSize: '0.8125rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '1rem'
            }}
          >
            <div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Category</div>
              <span className="badge badge-category">{ticket.category}</span>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Created At</div>
              <div style={{ fontWeight: 500 }}>{formatDate(ticket.createdAt)}</div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Updated At</div>
              <div style={{ fontWeight: 500 }}>{formatDate(ticket.updatedAt)}</div>
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          {/* Quick status update from modal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Status:</span>
            <select
              className="status-select-inline"
              value={ticket.status}
              onChange={(e) => onStatusChange(ticket.id, e.target.value)}
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                onDeleteTicket(ticket.id);
                onClose();
              }}
            >
              Delete Ticket
            </button>
            <button className="btn btn-secondary btn-sm" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
