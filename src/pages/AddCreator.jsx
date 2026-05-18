import { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

const AddCreator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error } = await supabase
      .from('creators')
      .insert([formData]);

    if (error) {
      console.error('Error adding creator:', error);
      setError('Failed to add creator. Please try again.');
      setSubmitting(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="add-page">
      <div className="add-page-header">
        <h1 className="add-page-title">ADD A CREATOR</h1>
        <p className="add-page-subtitle">Expand the Creatorverse</p>
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
            <label htmlFor="imageURL">Image URL <span className="optional">(optional)</span></label>
            <input
              type="url"
              id="imageURL"
              name="imageURL"
              placeholder="https://example.com/image.jpg"
              value={formData.imageURL}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Adding...' : 'Add Creator'}
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCreator;
