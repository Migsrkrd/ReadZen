import { Link } from "react-router-dom";
import { useState } from "react";

import DisplayReadMe from "./DisplayReadMe";
import Avatar from "./Avatar";

const Card = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(isModalOpen);
  };

  function noMoreThanWords(str) {
    if (str.split(" ").length > 30) {
      return str.split(" ").splice(0, 30).join(" ") + "...";
    }
    return str;
  }

  function share(event){
    event.stopPropagation();
    console.log("share")
  }

  function like(event){
    event.stopPropagation();
    console.log("like")
  }

  function comment(event){
    event.stopPropagation();
    console.log("comment")
  }

  return (
    <div className="cardLayout">
      {props.ReadMes.map((readme) => (
        <div key={readme._id} className="card" onClick={openModal}>
          <div className="card-header">
            <Link className="profile-link" to={`/profiles/${readme.author}`}>
              <h4>
                <Avatar letter={readme.author.charAt(0).toUpperCase()} />
                {readme.author}
              </h4>
            </Link>
            <h3>{readme.title}</h3>
          </div>
          <div className="card-body">
            {/* limit words */}
            <p>{noMoreThanWords(readme.description)}</p>
            <div className="card-links">
              <a
                href={readme.repoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-github"></i>
              </a>
              <a
                href={readme.deployedLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-link"></i>
              </a>
            </div>
            <div className="interactions">
        <button className="btnBeg" onClick={like}>Like</button>
        <button className="btnMid" onClick={comment}>Comment</button>
        <button className="btnEnd" onClick={share}>Share</button>
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
