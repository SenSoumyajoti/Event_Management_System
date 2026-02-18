import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    start_time: '',
    end_time: '',
    capacity: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!form.title || !form.start_time || !form.end_time || !form.capacity) {
      setMessage({ type: 'danger', text: 'Please fill required fields.' });
      return;
    }

    setLoading(true);
    try {
      // convert local datetime-local input to ISO string
      const payload = {
        title: form.title,
        description: form.description,
        location: form.location,
        start_time: form.start_time ? new Date(form.start_time).toISOString() : null,
        end_time: form.end_time ? new Date(form.end_time).toISOString() : null,
        capacity: parseInt(form.capacity, 10) || 0
      };

      const token = localStorage.getItem('access');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      // adjust the path if your backend uses a prefix (e.g. '/api/events/')
      const res = await api.post('createevent/', payload, { headers });

      setMessage({ type: 'success', text: 'Event created successfully.' });
      // optional: navigate to event detail or listing
      setTimeout(() => navigate('/events'), 800);
    } catch (err) {
      console.error('Create event error:', err);
      setMessage({
        type: 'danger',
        text: err.response?.data?.error || err.response?.data?.message || 'Failed to create event'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 800, marginTop: 24 }}>
      <h2>Create Event</h2>
      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title *</label>
          <input name="title" value={form.title} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="form-control" rows="4" />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input name="location" value={form.location} onChange={handleChange} className="form-control" />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Start time *</label>
            <input
              name="start_time"
              value={form.start_time}
              onChange={handleChange}
              type="datetime-local"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">End time *</label>
            <input
              name="end_time"
              value={form.end_time}
              onChange={handleChange}
              type="datetime-local"
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Capacity *</label>
          <input
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            type="number"
            className="form-control"
            min="0"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating…' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}