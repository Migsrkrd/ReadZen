import { Link } from "react-router-dom";
import { useState } from "react";

import DisplayReadMe from "./DisplayReadMe";
import Avatar from "./Avatar"

const Card = (props) => {

  console.log(props.ReadMes)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(isModalOpen);
  };

  return (
    <div>
    {props.ReadMes.map((readme) => (
    <div className="card"  onClick={openModal}>
      {console.log(readme)}
      <div className="card-header">
        <Link className="profile-link" to={`/profiles/${readme.author}`}>
          <h4><Avatar letter={readme.author.charAt(0).toUpperCase()}/>@{readme.author}</h4>
        </Link>
        <h3>{readme.title}</h3>
      </div>
      <div className="card-body">
        <p>{readme.description}</p>
        <div className="card-links">
          <a href={readme.reoLink} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-github"></i>
          </a>
          <a href={readme.deployedLink} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-link"></i>
          </a>
        </div>
      </div>
      {isModalOpen && (
        <DisplayReadMe
        onClose={closeModal}
        username={readme.username}
        title={readme.title}
        description={readme.description}
        />
      )}
    </div>
  ))}
  </div>
  );
};

export default Card;
