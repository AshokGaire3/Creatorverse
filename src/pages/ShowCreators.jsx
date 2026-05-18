import { useEffect, useState, useRef } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const creatorsRef = useRef(null);

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

  const scrollToCreators = () => {
    creatorsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">CREATORVERSE</h1>
          <div className="hero-buttons">
            <button className="hero-btn" onClick={scrollToCreators}>
              VIEW ALL CREATORS
            </button>
            <Link to="/new" className="hero-btn">
              ADD A CREATOR
            </Link>
          </div>
        </div>
      </div>

      {/* Creators Section */}
      <div className="creators-section" ref={creatorsRef}>
        {loading ? (
          <div className="status-message">LOADING...</div>
        ) : creators && creators.length > 0 ? (
          <div className="grid-container">
            {creators.map((creator) => (
              <Card key={creator.id} creator={creator} />
            ))}
          </div>
        ) : (
          <div className="status-message">NO CREATORS YET 😔</div>
        )}
      </div>
    </div>
  );
};

export default ShowCreators;
