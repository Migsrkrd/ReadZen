import Card from "../components/Card";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ALL_READMES, GET_SEARCHED_READMES, GET_ME } from "../utils/queries";
import { useState } from "react";
import { TextField } from "@mui/material";

const Home = () => {

  const { loading: loadingReadMes, data: dataReadMe } = useQuery(GET_ALL_READMES);
  const { loading: loadingUser, data: dataUser } = useQuery(GET_ME);

  // const [getSearch, {load, dat }] = useLazyQuery(GET_SEARCHED_READMES)
  // console.log("load")
  console.log(dataReadMe);
  const ReadMes = dataReadMe?.publishedReadmes || [];
  const User = dataUser?.me;

  // const [search, setSearch] = useState('');

  // const handleInputChange = (event) => {
  //   console.log(event.target.value)
  //   setSearch(event.target.value)
  //   getSearch( {variables:{author: event.target.value}})
  // }

    return (
      <main>
        <div className="divy">
          {loadingReadMes ? 
          <h2>loading</h2> : 
          <div>
              {/* <TextField
                    id='search'  
                    label="Search"
                    value={search}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    /> */}
          <Card ReadMes={ReadMes} User={User} /> 
          </div>
          }
        </div>
      </main>
    );
  };
  
  export default Home;