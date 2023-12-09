import { Link } from "react-router-dom";

import Avatar from "./Avatar"

const Card = ({ title, description, github, deploy, username }) => {

  const letter = username.charAt(0).toUpperCase();

  return (
    <div className="card">
      <div className="card-header">
        <Link className="profile-link" to={`/profiles/${username}`}>
          <h4><Avatar letter={letter}/>@{username}</h4>
        </Link>
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <p>{description}</p>
        <div className="card-links">
          <a href={github} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-github"></i>
          </a>
          <a href={deploy} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-link"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
