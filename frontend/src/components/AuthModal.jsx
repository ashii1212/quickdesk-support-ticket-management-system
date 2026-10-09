import React, { useState } from 'react';
import { X, Lock, Mail, User, Shield, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { authService } from '../api/authService';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('SUPPORT_AGENT');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both email and password');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setError('Please enter your full name');
      return;
    }

    try {
      setIsLoading(true);
      let res;
      if (mode === 'login') {
        res = await authService.login(email.trim(), password);
      } else {
        res = await authService.register(name.trim(), email.trim(), password, role);
      }
      onAuthSuccess(res);
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail, demoPass) => {
    setError('');
    setEmail(demoEmail);
    setPassword(demoPass);
    try {
      setIsLoading(true);
      const res = await authService.login(demoEmail, demoPass);
      onAuthSuccess(res);
      onClose();
    } catch (err) {
      setError(err.message || 'Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '440px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 className="modal-title">
              {mode === 'login' ? 'Sign In to QuickDesk' : 'Create Agent Account'}
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              {mode === 'login'
                ? 'Access the support ticket management console'
                : 'Join your organization support operations team'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)',
            background: '#f8fafc'
          }}
        >
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            style={{
              flex: 1,
              padding: '0.75rem',
              fontWeight: 700,
              fontSize: '0.875rem',
              background: mode === 'login' ? '#fff' : 'transparent',
              color: mode === 'login' ? 'var(--primary)' : 'var(--text-muted)',
              border: 'none',
              borderBottom: mode === 'login' ? '2px solid var(--primary)' : 'none',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); }}
            style={{
              flex: 1,
              padding: '0.75rem',
              fontWeight: 700,
              fontSize: '0.875rem',
              background: mode === 'register' ? '#fff' : 'transparent',
              color: mode === 'register' ? 'var(--primary)' : 'var(--text-muted)',
              border: 'none',
              borderBottom: mode === 'register' ? '2px solid var(--primary)' : 'none',
              cursor: 'pointer'
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#b91c1c',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1rem',
                  fontSize: '0.8125rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Registration Name Field */}
            {mode === 'register' && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="name@quickdesk.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Role Selection for Registration */}
            {mode === 'register' && (
              <div className="form-group">
                <label className="form-label">Role</label>
                <select
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="SUPPORT_AGENT">Support Agent</option>
                  <option value="ADMIN">System Admin</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            {/* Demo Accounts Quick-Fill Card */}
            {mode === 'login' && (
              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  background: '#f8fafc',
                  border: '1px dashed var(--border-color)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Sparkles size={13} color="#2563eb" /> Quick Demo Credentials
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ justifyContent: 'space-between', fontSize: '0.75rem' }}
                    onClick={() => handleDemoLogin('admin@quickdesk.com', 'admin123')}
                    disabled={isLoading}
                  >
                    <span><strong>Admin:</strong> admin@quickdesk.com</span>
                    <ArrowRight size={13} />
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ justifyContent: 'space-between', fontSize: '0.75rem' }}
                    onClick={() => handleDemoLogin('agent@quickdesk.com', 'agent123')}
                    disabled={isLoading}
                  >
                    <span><strong>Agent:</strong> agent@quickdesk.com</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
