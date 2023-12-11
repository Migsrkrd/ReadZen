import { Link, useLocation, useParams } from "react-router-dom";
import Card from "../components/Card";
import ProfileCard from "../components/ProfileCard";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_READMES } from "../utils/queries";

const Profile = () => {

    const { loading, data } = useQuery(GET_READMES, {
        variables: {username: (useLocation().pathname === '/me' ? `${Auth.getProfile().data.username}` : useParams().username)  },
    });
    const ReadMes = data?.readmes || [];
    return (
        <>
        <h1>profile goes here</h1>
        <div>
            {useLocation().pathname === '/me'|| useParams().username===`${Auth.getProfile().data.username}` ? (
        <div>
       
        <Link to="/generate">
        Generate
        </Link> 
        <ProfileCard ReadMes={ReadMes}/>
        </div>
        )
        
        :  <Card ReadMes={ReadMes}/>}
        </div>
        </>
    )
}

export default Profile;