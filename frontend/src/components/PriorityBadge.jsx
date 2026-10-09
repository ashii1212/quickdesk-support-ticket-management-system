import React from 'react';
import { AlertCircle, AlertTriangle, ArrowDown } from 'lucide-react';

export default function PriorityBadge({ priority }) {
  if (!priority) return null;

  switch (priority.toUpperCase()) {
    case 'HIGH':
      return (
        <span className="badge badge-prio-high">
          <AlertCircle size={13} />
          High
        </span>
      );
    case 'MEDIUM':
      return (
        <span className="badge badge-prio-medium">
          <AlertTriangle size={13} />
          Medium
        </span>
      );
    case 'LOW':
      return (
        <span className="badge badge-prio-low">
          <ArrowDown size={13} />
          Low
        </span>
      );
    default:
      return <span className="badge">{priority}</span>;
  }
}
