import { Link} from 'react-router-dom';
import { useState } from 'react';
import Auth from '../utils/auth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
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
            <div>
                <Link to="/">
                    <h1>Home</h1>
                </Link>
                <Link to="/about">
                    <h1>About</h1>
                </Link>
                <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link onClick={() => {{handleOpen}}}>
                Login/Sign Up
              </Link>
            </>
          )}
        </div>
            </div>

            <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <Link eventKey='login'>Login</Link>
          <Link eventKey='signup'>Sign Up</Link>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <LoginForm handleModalClose={() => setShowModal(false)} />
                <SignupForm handleModalClose={() => setShowModal(false)} />
          </Typography>
        </Box>
      </Modal>
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
      </Modal>  */}
      </header>
    )
}

export default Header;