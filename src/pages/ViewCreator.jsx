import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

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
    if (window.confirm('Are you sure you want to delete this creator?')) {
      const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting creator:', error);
      } else {
        navigate('/');
      }
    }
  };

  if (loading) return <div className="loading">Loading details...</div>;
  if (!creator) return <div className="container" style={{ textAlign: 'center', marginTop: '2rem' }}>Creator not found. <Link to="/">Go Home</Link></div>;

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {creator.imageURL && (
          <div style={{ width: '100%', height: '400px', borderRadius: 'var(--pico-border-radius)', overflow: 'hidden' }}>
            <img src={creator.imageURL} alt={creator.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        <div>
          <h1 style={{ marginBottom: '0.5rem', color: '#c084fc' }}>{creator.name}</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>{creator.description}</p>
          {creator.url && (
            <a href={creator.url} target="_blank" rel="noopener noreferrer" role="button" className="secondary-button" style={{ marginBottom: '2rem', display: 'inline-block' }}>
              Visit Channel/Page
            </a>
          )}
        </div>
        <footer style={{ display: 'flex', gap: '1rem', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
          <Link to={`/edit/${creator.id}`} role="button">Edit</Link>
          <button className="danger-button" onClick={handleDelete}>Delete</button>
          <Link to="/" role="button" className="outline" style={{ marginLeft: 'auto' }}>Back to Home</Link>
        </footer>
      </article>
    </div>
  );
};

export default ViewCreator;
