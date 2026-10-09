import React from 'react';
import { Layers, Plus, LogIn, LogOut, UserCheck } from 'lucide-react';

export default function Navbar({ currentUser, onOpenLoginModal, onLogout, onOpenCreateModal }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <div className="brand-icon">
            <Layers size={22} />
          </div>
          <div>
            <div className="brand-title">
              QuickDesk
              <span className="brand-badge">Support Portal</span>
            </div>
            <div className="brand-subtitle">Support Ticket Management System</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {currentUser ? (
            <>
              {/* User Identity Pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.35rem 0.75rem',
                  background: '#f8fafc',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}
                >
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, lineHeight: 1.1 }}>
                    {currentUser.name}
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    {currentUser.role === 'ADMIN' ? 'Administrator' : 'Support Agent'}
                  </span>
                </div>
              </div>

              {/* Create Ticket Button */}
              <button
                id="btn-new-ticket"
                className="btn btn-primary btn-sm"
                onClick={onOpenCreateModal}
              >
                <Plus size={16} />
                Create Ticket
              </button>

              {/* Logout Button */}
              <button
                className="btn btn-secondary btn-sm"
                onClick={onLogout}
                title="Sign out of QuickDesk"
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary"
              onClick={onOpenLoginModal}
            >
              <LogIn size={18} />
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
