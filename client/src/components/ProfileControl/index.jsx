import Auth from "../utils/auth";
import Modal from "@mui/material/Modal";
import ChangeUsernameForm from "./ChangeUsernameForm";
import ChangePasswordForm from "./ChangePasswordForm";

import { TOGGLE_PROFILE_CONTROL } from '../../utils/actions';
import './style.css';

const ProfileControl = () => {
  const [state, dispatch] = useStoreContext();

  function toggleProfileControl() {
    dispatch({ type: TOGGLE_PROFILE_CONTROL });
  }

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
    <div className="profile-control">
      <div className="close" onClick={toggleProfileControl}>
        [close]
      </div>
      <h2>Profile Control</h2>
      <div>
        <Button>
          Update username
        </Button>
        <Button>
          Change password
        </Button>
        <Button>
          Delete my account
        </Button>
        <Button>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfileControl;
