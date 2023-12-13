import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const Comment = ({ user, text }) => {
  return (
    <div className="comments">
      <Link className="profile-link" to={`/profiles/${user}`}>
        <h5 className="comment-user">
            <Avatar letter={user.charAt(0).toUpperCase()} />
            &nbsp;
            {user}
        </h5>
      </Link>
      <p className="comment-text">{text}</p>
    </div>
  );
};

export default Comment;
