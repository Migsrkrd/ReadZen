import { Link } from "react-router-dom";
import { useState } from "react";
import MarkdownIt from 'markdown-it';
import { Button, Modal, Box } from "@mui/material";
import { useMutation } from '@apollo/client';
import { DELETE_README } from '../utils/mutations';

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
  const [deleteId, setDeleteId] = useState();
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
  const [deleteReadMe] = useMutation(DELETE_README, {
    variables: { readMeId: deleteId }
  });

  const callDelete = (id) => {
    deleteReadMe({
      variables: { readMeId: id }
    });
  }

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
            <Button variant="outlined">Edit</Button>
            </Link>
          <Button onClick={() => callDelete(readme._id)}variant="outlined">Delete</Button>
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
