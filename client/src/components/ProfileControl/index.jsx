import Auth from "../utils/auth";
import Button from '@mui/material/Button'
import Modal from "@mui/material/Modal";
import ChangeUsernameForm from "./ChangeUsernameForm";
import ChangePasswordForm from "./ChangePasswordForm";

import { TOGGLE_PROFILE_CONTROL } from '../../utils/actions';
import './style.css';

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

const ProfileControl = () => {
  const [state, dispatch] = useStoreContext();

  function toggleProfileControl() {
    dispatch({ type: TOGGLE_PROFILE_CONTROL });
  }


  const [showModal, setShowModal] = useState(false);
  const [activeForm, setActiveForm] = useState();
  const [open, setOpen] = useState(false);

  const UPDATE_USERNAME = 'UPDATE_USERNAME';
  const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

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
      <div className="profile-control-closed" onClick={toggleProfileControl}>
        <span role="img" aria-label="profile-control">
          ⚙️
        </span>
      </div>
    );
  }

  return (
    <div>

      <div className="profile-control">
        <div className="close" onClick={toggleProfileControl}>
          [close]
        </div>
        <h2>{Auth.getProfile().data.username}'s</h2>
        <h2>Profile Control</h2>
        <div>
          
        <Button
            className="pro-con-btn"
            onClick={handleOpen(UPDATE_USERNAME)}
          >
            Update username
          </Button>

          <Button
            className="pro-con-btn"
            onClick={handleOpen(UPDATE_PASSWORD)}
          >
            Change password
          </Button>

          <Button
            className="pro-con-btn"
            onClick={deleteAccount}
          >
            Delete my account
          </Button>
          
          <Button
            className="pro-con-btn"
            onClick={logout}
          >
            Logout
          </Button>
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {activeForm === UPDATE_USERNAME
                ? <ChangeUsernameForm />
                : <ChangePasswordForm />}
            </Typography>
          </Box>
        </Modal>
      </div>

    </div>
  );
};

export default ProfileControl;
