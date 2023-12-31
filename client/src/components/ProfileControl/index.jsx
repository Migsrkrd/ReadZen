import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';

import Backdrop   from '@mui/material/Backdrop';
import Box        from '@mui/material/Box';
import Button     from '@mui/material/Button'
import Modal      from "@mui/material/Modal";
import Typography from '@mui/material/Typography';

import ChangeUsernameForm    from '../Forms/ChangeUsernameForm';
import ChangePasswordForm    from '../Forms/ChangePasswordForm';
import ConfirmDeleteUserForm from '../Forms/ConfirmDeleteUserForm';

import { TOGGLE_PROFILE_CONTROL } from '../../utils/actions';

const ProfileControl = () => {
  const [state, dispatch] = useStoreContext();

  function toggleProfileControl() {
    dispatch({ type: TOGGLE_PROFILE_CONTROL });
  }

  const [activeForm, setActiveForm] = useState();
  const [open, setOpen] = useState(false);

  const UPDATE_USERNAME = 'UPDATE_USERNAME';
  const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
  const CONFIRM_DELETE_USER = 'CONFIRM_DELETE_USER';

  const handleOpen = (formState) => {
    setActiveForm(formState);
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  if (!state.profileControlOpen) {
    return (
      <h3>
        <i className="fa-solid fa-gear navlink-home" onClick={toggleProfileControl} ></i>
      </h3>
        

    );
  }

  return (
    <div>

      <div className="profile-control">
        <div className="close" onClick={toggleProfileControl}>
          [close]
        </div>
        <h2>Profile Settings</h2>
        <div className='buttons-area'>
          
          <Button
            className="pro-con-btn"
            sx={{
              m: 1,
              color: '#a80038',
              fontWeight: 'bold',
              border: '2px solid #a80038',
              '&:hover': {
                color: '#fbf9fa',
                backgroundColor: '#a80038',
                border: '2px solid #fbf9fa',
                
              },
            }}
            onClick={() => handleOpen(UPDATE_USERNAME)}
          >
              Change Username
          </Button>

          <Button
            className="pro-con-btn"
            onClick={() => handleOpen(UPDATE_PASSWORD)}
            sx={{
              m: 1,
              color: '#a80038',
              fontWeight: 'bold',
              border: '2px solid #a80038',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: '#fbf9fa',
                transition: 'all 0.2s ease',
                backgroundColor: '#a80038',
                
              },
              '&:active': {
                color: '#fbf9fa',
                backgroundColor: '#fd0054',
                
              },
            }}
          >
            Change Password
          </Button>

          <Button
            className="pro-con-btn"
            sx={{
              m: 1,
              color: '#a80038',
              fontWeight: 'bold',
              border: '2px solid #a80038',
              '&:hover': {
                color: '#fbf9fa',
                backgroundColor: '#a80038',
                border: '2px solid #fbf9fa',
                
              },
            }}
            onClick={() => handleOpen(CONFIRM_DELETE_USER)}
          >
            Delete My Account
          </Button>

        </div>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          slots={{
            backdrop: Backdrop,
          }}
          slotProps={{
            backdrop: {
              sx: { backdropFilter: 'blur(3px)' },
            },
          }}
          >
          <Box sx={{
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
          }}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {(() => {
                switch (activeForm) {
                  case UPDATE_USERNAME:
                    return <ChangeUsernameForm setOpen={setOpen} />;
                  case UPDATE_PASSWORD:
                    return <ChangePasswordForm setOpen={setOpen} />;
                  case CONFIRM_DELETE_USER:
                    return <ConfirmDeleteUserForm setOpen={setOpen} />;
                  default:
                    return null;
                }
              })()}
            </Typography>
          </Box>
        </Modal>
      </div>

    </div>
  );
};

export default ProfileControl;
