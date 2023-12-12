import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { useState } from "react";
import DisplayReadMe from "./DisplayReadMe";
import Avatar from "./Avatar";
import { useMutation } from "@apollo/client";
import { DELETE_README, UPDATE_README } from "../utils/mutations";

const ProfileCard = (props) => {
  console.log('props.ReadMes');
  console.log(props.ReadMes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [deleteId, setDeleteId] = useState();

  const [deleteReadMe] = useMutation(DELETE_README, {
    // variables: { readMeId: deleteId },
  });

  const [togglePublished] = useMutation(UPDATE_README);

  const callDelete = (id, event) => {
    event.stopPropagation();
    // setDeleteId(id);
    deleteReadMe(
      {
        variables: {
          readMeId: id,
        },
      }
    );
  }

  const callPublish = (id, isPublished, event) => {
    event.stopPropagation();
    const newIsPublished = !isPublished;
    const newDatePublished = newIsPublished
      ? new Date().toISOString()
      : null;

    togglePublished({
      variables: { 
        readMeId: id,
        isPublished: newIsPublished,
        datePublished: newDatePublished,
        },
    });
  };

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
            
              <Link
                to="#"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`http://${readme.repoLink}`, "_blank");
                }}
              >
                <i className="fa fa-github"></i>
              </Link>

              <Link
                to="#"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`http://${readme.deployedLink}`, "_blank");
                }}
              >
                <i className="fa fa-link"></i>
              </Link>

            </div>

            <div className="interactions">
              
              <Link className="edit-link" to="/generate" state={{ readme }}>
                <button className="btnBeg">Edit</button>
              </Link>

              <Button
                className="btnMid"
                onClick={(event) => callDelete(readme._id, event)}
              >
                Delete
              </Button>

              <Button
                onClick={(event) => callPublish(readme._id, readme.isPublished, event)}
                variant="outlined"
              >
                {readme.isPublished ? 'Unpublish' : 'Publish'}
              </Button>

            </div>
          </div>

          {isModalOpen && (
            <DisplayReadMe
              onClose={closeModal}
              title={readme.title}
              description={readme.description}
              installation={readme.installation}
              usage={readme.usage}
              license={readme.license}
              toc={readme.tableOfContents}
              credits={readme.credits}
              tests={readme.tests}
              repoLink={readme.repoLink}
              deployedLink={readme.deployedLink}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfileCard;
