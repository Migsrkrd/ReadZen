import { Link } from "react-router-dom";
import { useState } from "react";
import MarkdownIt from 'markdown-it';
import { Box, Button, Modal, Typography } from "@mui/material";
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

const Card = (props) => {

  const md = MarkdownIt()
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

export default Card;
