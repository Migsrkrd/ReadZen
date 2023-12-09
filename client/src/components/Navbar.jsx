import { Link } from "react-router-dom";
import { useState } from "react";
import Auth from "../utils/auth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

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

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const [activeForm, setActiveForm] = useState("login");
  const handleFormChange = (event) => {
    setActiveForm(event.target.name === "login" ? "login" : "sign up");
  };
  console.log("get profile data ",  Auth.getProfile().data)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <div className="headers">
        <h1>ReadZen</h1>
        <div className="nav">
          <Link className="navlink-home" to="/">
            <h2><i className="fa fa-home"></i></h2>
          </Link>
          <Link className="navlink" to="/about">
            <h2>About</h2>
          </Link>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <div className="far-nav">
              <Link className="btn btn-lg btn-info m-2 navlink" to="/me">
                <h2>{Auth.getProfile().data.username}'s profile</h2>
              </Link>

                <h2 className="navlink" onClick={logout}>Logout</h2>

            </div>
          ) : (
            <div className="far-nav">
              <Link className="navlink" onClick={handleOpen}>
                <h2>Login/Sign Up</h2>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Button name="login" onClick={handleFormChange}>
                Login
              </Button>
              <Button name="sign up" onClick={handleFormChange}>
                Sign Up
              </Button>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {activeForm === "login" ? <LoginForm /> : <SignupForm />}
            </Typography>
          </Box>
        </Modal>
      </div>
    </header>
  );
};

export default Header;
