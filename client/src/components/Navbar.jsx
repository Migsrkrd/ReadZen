import { Link } from "react-router-dom";
import { useState } from "react";
import Auth from "../utils/auth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Backdrop from "@mui/material/Backdrop";

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

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const [activeForm, setActiveForm] = useState("login");
  const handleFormChange = (event) => {
    setActiveForm(event.target.name === "login" ? "login" : "sign up");
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  function goHomeLogo() {
    window.location.href = "/";
  }

  return (
    <header>
      <div className="headers">
        <div onClick={goHomeLogo} className="logo">
          <img src="../../public/assets/logo.png" alt="logo" />
          <h1>ReadZen</h1>
        </div>
        <div className="nav">
          <Link className="navlink-home" to="/">
            <h3>
              <i className="fa fa-home"></i>
            </h3>
          </Link>
          <Link className="navlink" to="/about">
            <h3>About</h3>
          </Link>
        </div>
        <div className="far-nav">
          {Auth.loggedIn() ? (
            <div className="prof-logout">
              <Link to="/generate">
                <h3 className="navlink">Generate</h3>
              </Link>
              <Link className="btn btn-lg btn-info m-2 navlink" to="/me">
                <h3>{Auth.getProfile().data.username}'s profile</h3>
              </Link>

              <h3 className="navlink" onClick={logout}>
                Logout
              </h3>
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
          BackdropComponent={Backdrop}
          BackdropProps={{
            sx: { backdropFilter: "blur(3px)" },
          }}
          open={open}
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
    </header>
  );
};

export default Header;
