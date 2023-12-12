import { Link } from "react-router-dom";
import { useState } from "react";
import MarkdownIt from 'markdown-it';
import { Button, Modal, Box } from "@mui/material";
import { useMutation } from '@apollo/client';
import { UPDATE_README, DELETE_README } from '../utils/mutations';
import Avatar from "./Avatar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProfileCard = (props) => {
  const md = MarkdownIt()
  // const [deleteId, setDeleteId] = useState();
  const [markdown, setMarkdown] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = (readme) => {
    setMarkdown(readme)
    setOpen(true);
  }
  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  }
  //   console.log(props.ReadMes)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [readMeIsPublished, setReadMeIsPublished] = useState();

  const [deleteReadMe] = useMutation(DELETE_README, {
    variables: { readMeId: deleteId },
  });

  const [togglePublishedState] = useMutation(UPDATE_README);

  const callDelete = (id, event) => {
    event.stopPropagation();
    setDeleteId(id);
    deleteReadMe();
  }

  const callPublish = (id, event) => {
    event.stopPropagation();
    setReadMeIsPublished = !props.readme.isPublished;
    const newDataPublished = readMeIsPublished
      ? new Date().toISOString()
      : 'DRAFT';

    togglePublishedState({
      variables: { 
        readMeId: id,
        isPublished: readMeIsPublished,
        datePublished: newDataPublished,
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
        <div key={readme._id} className="card" onClick={()=>handleOpen(readme.markdown)}>
        
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

              <Button onClick={() => callPublish(readme._id, event)} variant="outlined">
                {readMeIsPublished ? 'Unpublish' : 'Publish'}
              </Button>

            </div>
          </div>
        </div>
  ))}
          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Box sx={style}> 
            <div dangerouslySetInnerHTML={{__html: md.render(`${markdown}`)}}>
                </div>
                <Button onClick={handleClose}>Close</Button>
            </Box>
          </Modal>
  </div>
  );
};

export default ProfileCard;


{/* <div>
    {props.ReadMes.map((readme) => (
    <div key={readme._id} className="card">

      <div className="card-header">
        <h3>{readme.title}</h3>
      </div>
      <div className="card-body">
        <p>{noMoreThanWords(readme.description)}</p>
        <div className="card-links">
          <a href={readme.reoLink} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-github"></i>
          </a>
          <a href={readme.deployedLink} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-link"></i>
          </a>

          <Button onClick={()=>handleOpen(readme.markdown)} variant="outlined">Show ReadMe</Button>
          <Link to='/generate' state= {{ readme} }>
            <Button variant="outlined">Edit</Button> */}