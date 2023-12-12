import { Link } from "react-router-dom";
import { useState } from "react";
import DisplayReadMe from "./DisplayReadMe";
import Avatar from "./Avatar"
import { Button } from "@mui/material";
import { useMutation } from '@apollo/client';
import { DELETE_README } from '../utils/mutations';

const ProfileCard = (props) => {

//   console.log(props.ReadMes)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const [deleteReadMe] = useMutation(DELETE_README, {
    variables: { readMeId: deleteId }
  });

  const callDelete = (id) => {
    deleteReadMe({
      variables: { readMeId: id }
    });
  }

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(isModalOpen);
  };

  function noMoreThanWords(str) {
    if (str.split(" ").length > 30){

      return str.split(" ").splice(0, 30).join(" ") + "...";
    }
    return str;
  }

  return (
    <div>
    {props.ReadMes.map((readme) => (
    <div key={readme._id} className="card">
      {/* {console.log(readme)} */}
      <div className="card-header">
        <h3>{readme.title}</h3>
      </div>
      <div className="card-body">
        {/* limit words */}
        <p>{noMoreThanWords(readme.description)}</p>
        <div className="card-links">
          <a href={readme.reoLink} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-github"></i>
          </a>
          <a href={readme.deployedLink} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-link"></i>
          </a>

          <Button onClick={openModal} variant="outlined">Show ReadMe</Button>
          <Link to='/generate' state= {{ readme} }>
            <Button variant="outlined">Edit</Button>
            </Link>
          <Button onClick={() => callDelete(readme._id)}variant="outlined">Delete</Button>
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

export default ProfileCard;
