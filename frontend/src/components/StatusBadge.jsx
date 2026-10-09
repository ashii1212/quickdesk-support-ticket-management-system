import React from 'react';
import { CircleDot, Clock, CheckCircle2 } from 'lucide-react';

export default function StatusBadge({ status }) {
  if (!status) return null;

  switch (status.toUpperCase()) {
    case 'OPEN':
      return (
        <span className="badge badge-status-open">
          <CircleDot size={13} />
          Open
        </span>
      );
    case 'IN_PROGRESS':
      return (
        <span className="badge badge-status-in_progress">
          <Clock size={13} />
          In Progress
        </span>
      );
    case 'RESOLVED':
      return (
        <span className="badge badge-status-resolved">
          <CheckCircle2 size={13} />
          Resolved
        </span>
      );
    default:
      return <span className="badge">{status}</span>;
  }
}
