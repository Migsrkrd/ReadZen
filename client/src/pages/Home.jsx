import Card from "../components/Card";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ALL_READMES, GET_SEARCHED_READMES } from "../utils/queries";
import { useState } from "react";
import { TextField } from "@mui/material";

const Home = () => {

  const { loading, data } = useQuery(GET_ALL_READMES);

  const [getSearch, {load, dat }] = useLazyQuery(GET_SEARCHED_READMES)
  // console.log("load")
  // console.log(data)
  const ReadMes = data?.publishedReadmes || [];

  const [search, setSearch] = useState('');

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
    getSearch( {variables:{author: event.target.value}})
  }

    return (
      <main>
        <div className="divy">
          {loading ? 
          <h2>loading</h2> : 
          <div>
              <TextField
                    id='search'  
                    label="Search"
                    value={search}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />
          <Card ReadMes={ReadMes} /> 
          </div>
          }
        </div>
      </main>
    );
  };
  
  export default Home;