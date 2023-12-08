import { Link } from "react-router-dom";
import { useState } from "react";
import Auth from "../utils/auth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <h1>Logo</h1>
      <div className="nav">
        <Link className="navlink-home" to="/">
          <h2><i class="fa fa-home"></i></h2>
        </Link>
        <Link className="navlink" to="/about">
          <h2>About</h2>
        </Link>
      </div>
      <div className="nav">
        {Auth.loggedIn() ? (
          <>
            <Link className="btn btn-lg btn-info m-2 navlink" to="/me">
              <h2>{Auth.getProfile().data.username}'s profile</h2>
            </Link>
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
              <h2>Logout</h2>
            </button>
          </>
        ) : (
          <>
            <Link className="navlink" onClick={() => setShowModal(true)}>
              <h2>Login/Sign Up</h2>
              </Link>
          </>
        )}
        </div>


      {/* <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        <Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Item>
                  <Link eventKey='login'>Login</Link>
                </Item>
                <Item>
                  <Link eventKey='signup'>Sign Up</Link>
                </Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Content>
              <Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Pane>
              <Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Pane>
            </Content>
          </Modal.Body>
        </Container>
      </Modal> */}
    </header>
  );
};

export default Header;
