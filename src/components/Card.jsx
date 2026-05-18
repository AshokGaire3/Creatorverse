import { Link } from 'react-router-dom';

const Card = ({ creator }) => {
  return (
    <article className="creator-card">
      <header>
        {creator.imageURL ? (
          <img src={creator.imageURL} alt={creator.name} />
        ) : (
          <div className="placeholder-img">
            {creator.name.charAt(0).toUpperCase()}
          </div>
        )}
      </header>
      <div className="creator-card-body">
        <h3>{creator.name}</h3>
        <p>{creator.description}</p>
      </div>
      <footer>
        <Link to={`/creator/${creator.id}`} role="button" className="secondary-button">
          View Details
        </Link>
        <Link to={`/edit/${creator.id}`} role="button" className="outline">
          Edit
        </Link>
      </footer>
    </article>
  );
};

export default Card;
