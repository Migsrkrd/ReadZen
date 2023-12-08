import { Link } from "react-router-dom";

const Card = ({ title, description, github, deploy, username }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
        <Link to={`/profiles${username}`}>
          <h4>{username}</h4>
        </Link>
      </div>
      <div className="card-body">
        <p>{description}</p>
        <div className="card-links">
          <a href={github} target="_blank" rel="noopener noreferrer">
          <i class="fa fa-github"></i>
          </a>
          <a href={deploy} target="_blank" rel="noopener noreferrer">
          <i class="fa fa-link"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;