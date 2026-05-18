import { useEffect, useState } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select();

      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data);
      }
      setLoading(false);
    };

    fetchCreators();
  }, []);

  return (
    <div className="container">
      <div className="hero">
        <h1>CREATORVERSE</h1>
        <p>Explore the universe of your favorite content creators.</p>
        <Link to="/new" role="button" style={{ marginTop: '1rem' }}>
          Add a Creator
        </Link>
      </div>

      {loading ? (
        <div className="loading">Loading creators...</div>
      ) : creators && creators.length > 0 ? (
        <div className="grid-container">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>You haven't added any creators yet!</p>
          <Link to="/new" role="button" className="secondary-button">
            Add Your First Creator
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShowCreators;
