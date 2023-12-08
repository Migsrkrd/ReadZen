import { Link} from 'react-router-dom';
import { useState } from 'react';
import Auth from '../utils/auth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Header = () => {
    const [showModal, setShowModal] = useState(false);
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
              <Link onClick={() => setShowModal(true)}>
                Login/Sign Up
              </Link>
            </>
          )}
        </div>
            </div>

        <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
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
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
      </header>
    )
}

export default Header;