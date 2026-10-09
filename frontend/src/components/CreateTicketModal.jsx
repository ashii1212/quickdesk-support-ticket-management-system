import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

export default function CreateTicketModal({ isOpen, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    title: '',
    description: '',
    category: 'TECHNICAL',
    priority: 'MEDIUM'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) {
      errs.customerName = 'Customer name is required';
    }

    if (!formData.customerEmail.trim()) {
      errs.customerEmail = 'Customer email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.customerEmail.trim())) {
        errs.customerEmail = 'Please enter a valid email address (e.g., name@example.com)';
      }
    }

    if (!formData.title.trim()) {
      errs.title = 'Issue title is required';
    }

    if (!formData.description.trim()) {
      errs.description = 'Issue description is required';
    }

    if (!formData.category) {
      errs.category = 'Category is required';
    }

    if (!formData.priority) {
      errs.priority = 'Priority is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onSubmitSuccess(formData);
      onClose();
    } catch (err) {
      setApiError(err.message || 'Failed to create ticket. Please check input.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Create Support Ticket</h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            title="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {apiError && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#b91c1c',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.25rem',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <AlertCircle size={16} />
                <span>{apiError}</span>
              </div>
            )}

            <div className="form-row">
              {/* Customer Name */}
              <div className="form-group">
                <label className="form-label">
                  Customer Name<span className="req">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.customerName ? 'error' : ''}`}
                  placeholder="e.g., Alex Johnson"
                  value={formData.customerName}
                  onChange={(e) => handleChange('customerName', e.target.value)}
                />
                {errors.customerName && (
                  <div className="error-message">
                    <AlertCircle size={12} /> {errors.customerName}
                  </div>
                )}
              </div>

              {/* Customer Email */}
              <div className="form-group">
                <label className="form-label">
                  Customer Email<span className="req">*</span>
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.customerEmail ? 'error' : ''}`}
                  placeholder="e.g., alex@company.com"
                  value={formData.customerEmail}
                  onChange={(e) => handleChange('customerEmail', e.target.value)}
                />
                {errors.customerEmail && (
                  <div className="error-message">
                    <AlertCircle size={12} /> {errors.customerEmail}
                  </div>
                )}
              </div>
            </div>

            {/* Issue Title */}
            <div className="form-group">
              <label className="form-label">
                Issue Title<span className="req">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.title ? 'error' : ''}`}
                placeholder="Brief summary of the issue"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
              {errors.title && (
                <div className="error-message">
                  <AlertCircle size={12} /> {errors.title}
                </div>
              )}
            </div>

            <div className="form-row">
              {/* Category */}
              <div className="form-group">
                <label className="form-label">
                  Category<span className="req">*</span>
                </label>
                <select
                  className="form-control"
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  <option value="TECHNICAL">Technical</option>
                  <option value="BILLING">Billing</option>
                  <option value="ACCOUNT">Account</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              {/* Priority */}
              <div className="form-group">
                <label className="form-label">
                  Priority<span className="req">*</span>
                </label>
                <select
                  className="form-control"
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
            </div>

            {/* Issue Description */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">
                Issue Description<span className="req">*</span>
              </label>
              <textarea
                rows={4}
                className={`form-control ${errors.description ? 'error' : ''}`}
                placeholder="Detailed description of the customer's problem or request..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
              {errors.description && (
                <div className="error-message">
                  <AlertCircle size={12} /> {errors.description}
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Ticket...' : 'Create Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
