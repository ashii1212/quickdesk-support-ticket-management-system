import React from 'react';
import { Layers, Plus, LifeBuoy } from 'lucide-react';

export default function Navbar({ onOpenCreateModal }) {
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

        <button 
          id="btn-new-ticket"
          className="btn btn-primary"
          onClick={onOpenCreateModal}
        >
          <Plus size={18} />
          Create New Ticket
        </button>
      </div>
    </header>
  );
}
