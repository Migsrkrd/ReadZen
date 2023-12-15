import { Link } from 'react-router-dom';
import { useState } from 'react';
import MarkdownIt from 'markdown-it';
import { Button, Modal, Box, Typography } from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_README, DELETE_README } from '../utils/mutations';
import { GET_READMES, GET_ALL_READMES } from '../utils/queries';
import Avatar from './Avatar';
import { saveAs } from 'file-saver';
import Auth from '../utils/auth';

const deleteStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#2b2024",
  border: "2px solid #a80038",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  color: "#fbf9fa",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "600px",
  padding: "20px",
  backgroundColor: "#fbf9fa",
  border: "2px solid #a80038",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const btn = {
  border: "2px solid #fbf9fa ",
  backgroundColor: "#a80038",
  borderRadius: "10px",
  boxShadow: 24,
  color: "#fbf9fa",
  m: 1,
};

const ProfileCard = (props) => {

  const md = MarkdownIt()
  const [markdown, setMarkdown] = useState();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

  //toggles the published attribute on readmes
  const [togglePublished] = useMutation(UPDATE_README, {
    refetchQueries: [
      {
        query: GET_READMES, 
        variables: {
          username: Auth.getProfile().data.username
        }
      },
      {
        query: GET_ALL_READMES
      }
  ]
  });
  //deletes a read me
  const [deleteReadMe] = useMutation(DELETE_README, {
    refetchQueries:[
      GET_READMES, {
        variables: {
          username: Auth.getProfile().data.username
        }  
      }  
    ]  
  });  
    
  const handleOpen = (readme) => {
    setMarkdown(readme)
    setOpen(true);
  }  
  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  }  

  const handleDeleteOpen = (id, event) => {
    event.stopPropagation();
    setDeleteId(id);
    setIsModalOpen(true);
  };  

  const handleDeleteClose = () => {
    setIsModalOpen(false);
  };  

  const confirmDelete = () => {
    deleteReadMe({
      variables: {
        readMeId: deleteId,
      },  
    });  
    setIsModalOpen(false);
  };

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
  //toggles pin attribute on readme
    const togglePin = (id, isPinned, event) => {
      event.stopPropagation();
      const newIsPinned = !isPinned;
      togglePublished({
        variables: {
          readMeId: id,
          isPinned: newIsPinned,
        }
      })
    } 

  function noMoreThanWords(str) {
    if (str.split(" ").length > 30) {
      return str.split(" ").splice(0, 30).join(" ") + "...";
    }
    return str;
  }
//allows the user to download the file
  const downloadFile= (readme, title, event) => {
    event.stopPropagation();
    const fileName = `${title}.README.md`;
    const blob = new Blob([readme], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fileName);
  }
  let ReadMes=[];
  const pinnedFirst= () => {
    const pinned=props.ReadMes.filter(readme=>readme.isPinned);
    const unpinned=props.ReadMes.filter(readme=>!readme.isPinned);
    ReadMes=[pinned, unpinned].flat();
    console.log(ReadMes)
  }
  pinnedFirst()

  return (
    
    <div className="cardLayout">
      {ReadMes.map((readme) => (
        <div key={readme._id} className="card" onClick={()=>handleOpen(readme.markdown)}>
        
          <div className="card-header">
            <Link className="profile-link" to={`/profiles/${readme.author}`}>
              <h4>
                <Avatar letter={readme.author.charAt(0).toUpperCase()} />
                {readme.author}
              </h4>
            </Link>
            <i onClick={(event)=>togglePin(readme._id, readme.isPinned, event)} className={`fa-solid fa-thumbtack 
            ${readme.isPinned ? 'unpinned' : 'pinned'}`}></i>
            
          </div>
          
          <div className="card-body">
          <h3>{readme.title}</h3>
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
              <button
                className="btnMid"
                onClick={(event) => handleDeleteOpen(readme._id, event)}
              >
                Delete
              </button>

              <button className="btnMid"
                onClick={(event) => callPublish(readme._id, readme.isPublished, event)}
              >
                {readme.isPublished ? 'Unpublish' : 'Publish'}
              </button>
                <button className="btnEnd" onClick={(event)=> downloadFile(readme.markdown,readme.title,event)}>
                  Download
                </button>
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
        <Box fontStyle={style}> 
          <div className='markdown-body' dangerouslySetInnerHTML={{__html: md.render(`${markdown}`)}}>
          </div>

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
           onClick={handleClose}>
            Close
          </Button>

        </Box>
      </Modal>

      <Modal
        open={isModalOpen}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={deleteStyle}>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Delete
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this card?
          </Typography>

          <Button sx={btn} onClick={confirmDelete}>
            Delete
          </Button>

          <Button sx={btn} onClick={handleDeleteClose}>
            Cancel
          </Button>

        </Box>
      </Modal>

    </div>
  );
};

export default ProfileCard;
