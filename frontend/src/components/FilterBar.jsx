import React from 'react';
import { Search, X, RotateCcw } from 'lucide-react';

export default function FilterBar({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  category,
  setCategory,
  onResetFilters,
  totalResults
}) {
  const hasActiveFilters = search || status || priority || category;

  return (
    <div className="controls-container">
      <div className="controls-header">
        {/* Search Input */}
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by issue title or customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#94a3b8'
              }}
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="filters-row">
          <select
            className="filter-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter by Status"
          >
            <option value="">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>

          <select
            className="filter-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            aria-label="Filter by Priority"
          >
            <option value="">All Priorities</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>

          <select
            className="filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by Category"
          >
            <option value="">All Categories</option>
            <option value="TECHNICAL">Technical</option>
            <option value="BILLING">Billing</option>
            <option value="ACCOUNT">Account</option>
            <option value="OTHER">Other</option>
          </select>

          {hasActiveFilters && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={onResetFilters}
              title="Reset all filters"
            >
              <RotateCcw size={14} />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      <div className="active-filters-summary">
        <span>
          Showing <strong>{totalResults}</strong> ticket{totalResults === 1 ? '' : 's'}
          {hasActiveFilters && ' (filtered)'}
        </span>
        {hasActiveFilters && (
          <span style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Combined search & filter active
          </span>
        )}
      </div>
    </div>
  );
}
