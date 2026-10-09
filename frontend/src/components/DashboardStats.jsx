import React from 'react';
import { Inbox, CircleDot, Clock, CheckCircle2 } from 'lucide-react';

export default function DashboardStats({ stats, selectedStatus, onSelectStatus }) {
  const cards = [
    {
      id: 'TOTAL',
      label: 'Total Tickets',
      count: stats?.totalTickets ?? 0,
      icon: Inbox,
      className: 'stat-icon-total',
      statusFilter: ''
    },
    {
      id: 'OPEN',
      label: 'Open Tickets',
      count: stats?.openTickets ?? 0,
      icon: CircleDot,
      className: 'stat-icon-open',
      statusFilter: 'OPEN'
    },
    {
      id: 'IN_PROGRESS',
      label: 'In Progress',
      count: stats?.inProgressTickets ?? 0,
      icon: Clock,
      className: 'stat-icon-progress',
      statusFilter: 'IN_PROGRESS'
    },
    {
      id: 'RESOLVED',
      label: 'Resolved',
      count: stats?.resolvedTickets ?? 0,
      icon: CheckCircle2,
      className: 'stat-icon-resolved',
      statusFilter: 'RESOLVED'
    }
  ];

  return (
    <div className="stats-grid">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = (selectedStatus === card.statusFilter) || (card.id === 'TOTAL' && !selectedStatus);

        return (
          <div
            key={card.id}
            className={`stat-card ${isActive ? 'active' : ''}`}
            onClick={() => onSelectStatus(card.statusFilter)}
            title={`Filter by ${card.label}`}
          >
            <div>
              <div className="stat-label">{card.label}</div>
              <div className="stat-number">{card.count}</div>
            </div>
            <div className={`stat-icon-wrapper ${card.className}`}>
              <Icon size={24} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
