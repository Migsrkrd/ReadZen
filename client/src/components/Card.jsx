import { Link } from "react-router-dom";
import { useState } from "react";
import DisplayReadMe from "./DisplayReadMe";
import Avatar from "./Avatar";
import { useEffect } from "react";
import { Button } from "@mui/material"
import Comment from "./Comment";

const Card = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [expandedCardClass, setExpandedCardClass] = useState("card");

  useEffect(() => {
    // Reset expandedCardId to null when comments are closed
    if (!isCommentsOpen) {
      setExpandedCardId(null);
    }
  }, [isCommentsOpen]);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(isModalOpen);
  };

  const noMoreThanWords = (str) => {
    if (str.split(" ").length > 30) {
      return str.split(" ").splice(0, 30).join(" ") + "...";
    }
    return str;
  };

  const share = (event) => {
    event.stopPropagation();
    console.log("share");
  };

  const like = (event) => {
    event.stopPropagation();
    console.log("like");
  };

  const comment = (event, cardId) => {
    event.stopPropagation();
    if (expandedCardId === cardId) {
      // If the same card is clicked again, reset the expandedCardId
      setExpandedCardId(null);
      setExpandedCardClass("card");
    } else {
      // Otherwise, set the expandedCardId to the clicked cardId
      setExpandedCardId(cardId);
      setExpandedCardClass("cardTwo");
    }
    setIsCommentsOpen(!isCommentsOpen);
  };


    const handleInputClick = (event) => {
      event.stopPropagation();
      // Your custom click handling logic here, if needed
    };


  return (
    <div className="cardLayout">
      {props.ReadMes.map((readme) => (
        <div
          key={readme._id}
          className={`card ${expandedCardId === readme._id ? "cardTwo" : ""}`}
          onClick={openModal}
        >
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
            {isCommentsOpen && expandedCardId === readme._id && (
              <div className="comment-section">
                <h4 className="comment-header">Comments</h4>
                <Comment user={"User"} text={"text goes here"}/>
                <textarea className="comment-input" onClick={handleInputClick} rows={4}/>
                <Button
                  sx={{
                    backgroundColor: "#a80038",
                    color: "#fbf9fa",
                    fontWeight: "bold",
                    margin: "10px",
                    "&:hover": {
                      backgroundColor: "#fd0054",
                      color: "#fbf9fa",
                      
                    },
                  }}
                  >Submit</Button>
              </div>
            )}
            <div className="interactions">
              <button
                className="btnBeg"
                onClick={(event) => like(event, readme._id)}
              >
                Like
              </button>
              <button
                className="btnMid"
                onClick={(event) => comment(event, readme._id)}
              >
                Comment
              </button>
              <button
                className="btnEnd"
                onClick={(event) => share(event, readme._id)}
              >
                Share
              </button>
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
