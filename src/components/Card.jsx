import { Link } from 'react-router-dom';

const Card = ({ creator }) => {
  return (
    <article className="creator-card">
      <div className="creator-card-image">
        {creator.imageURL ? (
          <img src={creator.imageURL} alt={creator.name} />
        ) : (
          <div className="creator-card-avatar">
            {creator.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="creator-card-overlay" />
      </div>

      <div className="creator-card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 className="creator-card-name" style={{ margin: 0 }}>{creator.name}</h3>
          {creator.url && (
            <a href={creator.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', fontSize: '1.2rem' }} title="Visit Channel">
              🔗
            </a>
          )}
        </div>
        <p className="creator-card-desc">
          {creator.description?.length > 100
            ? creator.description.slice(0, 100) + '…'
            : creator.description}
        </p>

        <div className="creator-card-actions">
          <Link to={`/creator/${creator.id}`} className="card-btn-primary">
            View Profile
          </Link>
          <Link to={`/edit/${creator.id}`} className="card-btn-ghost">
            Edit
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Card;
