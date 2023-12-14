import { Link, useLocation, useParams } from "react-router-dom";
import Card from "../components/Card";
import ProfileCard from "../components/ProfileCard";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_READMES } from "../utils/queries";

const Profile = () => {
  const { loading, data } = useQuery(GET_READMES, {
    variables: {
      username:
        useLocation().pathname === "/me"
          ? `${Auth.getProfile().data.username}`
          : useParams().username,
    },
  });
  const ReadMes = data?.readmes || [];
  return (
    <>
      <div>
        {(useLocation().pathname === "/me" && Auth.loggedIn()) ||
        (Auth.loggedIn() && useParams().username === `${Auth.getProfile().data.username}`) ? (
          <div>
            <div className="dashboard">
              <h2>Welcome {Auth.getProfile().data.username}!</h2>
            </div>
            <ProfileCard ReadMes={ReadMes} />
          </div>
        ) : (
          <div>
            <div className="dashboard">
              <h2>{useParams().username}'s Profile</h2>
            </div>
            <Card ReadMes={ReadMes} />
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
