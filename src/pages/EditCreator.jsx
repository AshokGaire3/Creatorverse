import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setFormData({
          name: data.name || '',
          url: data.url || '',
          description: data.description || '',
          imageURL: data.imageURL || ''
        });
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error } = await supabase
      .from('creators')
      .update(formData)
      .eq('id', id);

    if (error) {
      console.error('Error updating creator:', error);
      setError('Failed to save changes. Please try again.');
      setSubmitting(false);
    } else {
      navigate(`/creator/${id}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete "${formData.name}"? This cannot be undone.`)) {
      setDeleting(true);
      const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting creator:', error);
        setDeleting(false);
      } else {
        navigate('/');
      }
    }
  };

  if (loading) {
    return (
      <div className="add-page">
        <div className="status-message">LOADING...</div>
      </div>
    );
  }

  return (
    <div className="add-page">
      {/* Header with image preview */}
      <div className="edit-page-header">
        <div
          className="edit-avatar-preview"
          style={formData.imageURL ? { backgroundImage: `url(${formData.imageURL})` } : {}}
        >
          {!formData.imageURL && (
            <span className="edit-avatar-letter">
              {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
            </span>
          )}
          <div className="edit-avatar-overlay" />
        </div>

        <div className="edit-header-text">
          <p className="add-page-subtitle">Editing</p>
          <h1 className="add-page-title">{formData.name || 'Creator'}</h1>
        </div>
      </div>

      <div className="add-page-body">
        <form onSubmit={handleSubmit} className="creator-form">
          {error && <p className="form-error">{error}</p>}

          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. MrBeast"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">Channel / Page URL *</label>
            <input
              type="url"
              id="url"
              name="url"
              placeholder="https://youtube.com/..."
              value={formData.url}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              placeholder="What do they create?"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageURL">
              Image URL <span className="optional">(optional)</span>
            </label>
            <input
              type="url"
              id="imageURL"
              name="imageURL"
              placeholder="https://example.com/image.jpg"
              value={formData.imageURL}
              onChange={handleChange}
            />
          </div>

          {/* Primary actions */}
          <div className="form-actions form-actions--compact">
            <button type="submit" className="btn-primary" disabled={submitting || deleting}>
              {submitting ? 'Saving...' : '✓ Save Changes'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate(`/creator/${id}`)}
              disabled={submitting || deleting}
            >
              Cancel
            </button>
          </div>

          {/* Danger zone */}
          <div className="edit-danger-zone">
            <p className="danger-zone-label">Danger Zone</p>
            <button
              type="button"
              className="btn-danger btn-danger-full"
              onClick={handleDelete}
              disabled={submitting || deleting}
            >
              {deleting ? 'Deleting...' : '🗑 Delete This Creator'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCreator;
