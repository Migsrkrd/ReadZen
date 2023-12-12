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
        {useLocation().pathname === "/me" ||
        useParams().username === `${Auth.getProfile().data.username}` ? (
          <div>
            <div className="dashboard">
              <h2>Dashboard</h2>
              <Link className="generate" to="/generate">Generate</Link>
            </div>
            <ProfileCard ReadMes={ReadMes} />
          </div>
        ) : (
          <Card ReadMes={ReadMes} />
        )}
      </div>
    </>
  );
};

export default Profile;
