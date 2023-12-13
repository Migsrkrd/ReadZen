import { Link } from "react-router-dom";
import { useState } from "react";
import MarkdownIt from "markdown-it";
import { Box, Button, Modal} from "@mui/material";
import Avatar from "./Avatar";
import Comment from "./Comment";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { GET_ALL_READMES, GET_COMMENTS } from "../utils/queries";
import { ADD_COMMENT } from "../utils/mutations";
import Auth from "../utils/auth";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fbf9fa",
  border: "2px solid #a80038",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const btn = {
  color: "#a80038",
  border: "2px solid #a80038 ",
  backgroundColor: "#fbf9fa",
  borderRadius: "10px",
  boxShadow: 24,
  m: 1,
};

const Card = (props) => {
  const md = MarkdownIt();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [expandedCardClass, setExpandedCardClass] = useState("card");
  const [markdown, setMarkdown] = useState();
  const [open, setOpen] = useState(false);

  const [addComment] = useMutation(ADD_COMMENT,{
    refetchQueries: [
    GET_COMMENTS ]
  })

  
  const [commentText, setCommentText] = useState("");
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const [activeForm, setActiveForm] = useState("login");
  const { loading, data } = useQuery(GET_COMMENTS, {
    variables: { readMeId: expandedCardId },
  });

  const comments = data?.comments || [];

  useEffect(() => {
    // Reset expandedCardId to null when comments are closed
    if (!isCommentsOpen) {
      setExpandedCardId(null);
    }
  }, [isCommentsOpen]);

  async function handleCommentSubmit(event) {
    event.stopPropagation();
    if(!Auth.loggedIn()){
      setIsLoggedIn(true);
      return;
    }

    // Check if the comment text is not empty before submitting
    try {
      if (commentText.trim() !== "") {
        console.log("Before add comment");
        console.log("expandedCardId", expandedCardId);
        addComment({
          variables: {
            author: Auth.getProfile().data.username,
            readMeId: expandedCardId,
            text: commentText,
          },
        });
        console.log("comment created! here is your comment: ", commentText);
      } else {
        console.log("Comment text is empty. Not submitting.");
      }
    } catch (err) {
      console.log(err);
    }

    // Close the comment section after submitting
    setCommentText("");
  }

  const handleOpen = (readme) => {
    setMarkdown(readme);
    setOpen(true);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
    setIsLoggedIn(false);
  };

  function noMoreThanWords(str) {
    if (str.split(" ").length > 30) {
      return str.split(" ").splice(0, 30).join(" ") + "...";
    }
    return str;
  }

  function share(event) {
    event.stopPropagation();
    console.log("share");
  }

  function like(event) {
    event.stopPropagation();
    console.log("like");
  }

  const openCommentSection = (event, cardId) => {
    event.stopPropagation();
    setExpandedCardId(cardId);
    setExpandedCardClass("cardTwo");
    setIsCommentsOpen(true);
  };

  const closeCommentSection = (event) => {
    event.stopPropagation();
    setExpandedCardId(null);
    setExpandedCardClass("card");
    setIsCommentsOpen(false);
  };

  const handleInputClick = (event) => {
    event.stopPropagation();
    // Your custom click handling logic here, if needed
  };

  function share(event, repoLink) {
    event.stopPropagation();

    // Create a temporary input element to hold the text
    const tempInput = document.createElement("input");
    tempInput.value = repoLink;

    // Append the input element to the DOM
    document.body.appendChild(tempInput);

    // Select the text inside the input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    console.log("Repo link copied:", repoLink);
  }

  function exit(event) {
    event.stopPropagation();
    setIsLoggedIn(false);
  }

  let ReadMes = [];
  const showPublished = () => {
    ReadMes = props.ReadMes.filter((readme) => readme.isPublished);
    // const unpinned=props.ReadMes.filter(readme=>!readme.isPinned);
    // ReadMes=[pinned, unpinned].flat();
  };
  showPublished();

  const handleFormChange = (event) => {
    setActiveForm(event.target.name === "login" ? "login" : "sign up");
  };

  return (
    <div className="cardLayout">
      {ReadMes.map((readme) => (
        <div
          key={readme._id}
          className={`card ${expandedCardId === readme._id ? "cardTwo" : ""}`}
          onClick={() => handleOpen(readme.markdown)}
        >
          <div className="card-header">
            <Link className="profile-link" to={`/profiles/${readme.author}`}>
              <h4>
                <Avatar letter={readme.author.charAt(0).toUpperCase()} />
                &nbsp;
                {readme.author}
              </h4>
            </Link>
          </div>
          <div className="card-body">
            <h3>{readme.title}</h3>
            {/* limit words */}
            <p>{noMoreThanWords(readme.description)}</p>
            <div className="card-links">
              <a
                href={readme.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                <i className="fa fa-github"></i>
              </a>
              <a
                href={readme.deployedLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                <i className="fa fa-link"></i>
              </a>
            </div>
            {isCommentsOpen && expandedCardId === readme._id && (
              <div className="comment-section">
                <h4 className="comment-header">Comments</h4>
                {comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    user={comment.author}
                    text={comment.text}
                  />
                ))}
                <textarea
                  className="comment-input"
                  onClick={handleInputClick}
                  rows={4}
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                />
                <Button
                  onClick={handleCommentSubmit}
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
                >
                  Submit
                </Button>
              </div>
            )}
            <div className="interactions">
              <button
                className="btnBeg"
                onClick={(event) => like(event, readme._id)}
              >
                Like
              </button>
              {isCommentsOpen && expandedCardId === readme._id ? (
                <button
                  className="btnMid"
                  onClick={(event) => closeCommentSection(event)}
                >
                  Close
                </button>
              ) : (
                <button
                  className="btnMid"
                  onClick={(event) => openCommentSection(event, readme._id)}
                >
                  Comment
                </button>
              )}
              <button
                className="btnEnd"
                onClick={(event) => share(event, readme.repoLink)}
              >
                Share
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
        <Box sx={style}>
          <div
            dangerouslySetInnerHTML={{ __html: md.render(`${markdown}`) }}
          ></div>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
      <Modal
          BackdropComponent={Backdrop}
          BackdropProps={{
            sx: { backdropFilter: "blur(3px)" },
          }}
          open={isLoggedIn}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Button
                sx={{
                  ...btn,
                  backgroundColor:
                    activeForm === "login" ? "" : "#a80038",
                  color: activeForm === "login" ? "#a80038" : "white",
                  "&:hover": {
                    backgroundColor: activeForm === "sign up" ? "" : "#a80038",
                    color: activeForm === "sign up" ? "#a80038" : "white",
                  },
                }}
                name="login"
                onClick={handleFormChange}
              >
                Login
              </Button>
              <Button
                sx={{
                  ...btn,
                  backgroundColor:
                    activeForm === "sign up" ? "white" : "#a80038",
                  color: activeForm === "sign up" ? "#a80038" : "white",
                  "&:hover": {
                    backgroundColor: activeForm === "login" ? "" : "#a80038",
                    color: activeForm === "login" ? "#a80038" : "white",
                  },
                }}
                name="sign up"
                onClick={handleFormChange}
              >
                Sign Up
              </Button>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {activeForm === "login" ? <LoginForm /> : <SignupForm />}
            </Typography>
          </Box>
        </Modal>
    </div>
  );
};

export default Card;
