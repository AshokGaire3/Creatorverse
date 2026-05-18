import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

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
        setCreator(data);
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm(`Delete "${creator.name}"? This cannot be undone.`)) {
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
      <div className="view-page">
        <div className="status-message">LOADING...</div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="view-page">
        <div className="view-not-found">
          <p>Creator not found.</p>
          <Link to="/" className="btn-secondary" style={{ width: 'auto', padding: '0.75rem 2rem' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="view-page">
      {/* Hero banner */}
      <div
        className="view-hero"
        style={creator.imageURL ? { backgroundImage: `url(${creator.imageURL})` } : {}}
      >
        <div className="view-hero-overlay" />
        <div className="view-hero-content">
          {!creator.imageURL && (
            <div className="view-avatar">{creator.name.charAt(0).toUpperCase()}</div>
          )}
          <h1 className="view-name">{creator.name}</h1>
          {creator.url && (
            <a
              href={creator.url}
              target="_blank"
              rel="noopener noreferrer"
              className="view-channel-link"
            >
              🔗 Visit Channel / Page
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="view-content">
        <div className="view-description-card">
          <h2 className="view-section-label">About</h2>
          <p className="view-description">{creator.description}</p>
        </div>

        <div className="view-actions">
          <Link to={`/edit/${creator.id}`} className="btn-primary small-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            ✏️ Edit Creator
          </Link>
          <button
            className="btn-danger small-btn"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : '🗑 Delete Creator'}
          </button>
          <button className="btn-secondary small-btn" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCreator;
