import Card from "../components/Card";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ALL_READMES, GET_SEARCHED_READMES } from "../utils/queries";
import { useState } from "react";
import { TextField } from "@mui/material";

const Home = () => {

  const { loading, data } = useQuery(GET_ALL_READMES);

  const ReadMes = data?.publishedReadmes || [];

  const [getSearch, {load, error, dat }] = useLazyQuery(GET_SEARCHED_READMES)

  const [search, setSearch] = useState('');

  let searchResults
  const handleInputChange = async (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
    searchResults = await getSearch( {variables:{author: event.target.value}})
    console.log(dat)
  }
  console.log(load)
  console.log(search !== '' ? searchResults : "nothing")

    return (
      <main>
        <div className="divy">
          {loading ? 
          <h2>loading</h2> 
          : 
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
          {/* {search !== '' ? 
            <Card ReadMes={searchResults.data.searchReadmes} /> :
            <Card ReadMes={ReadMes} /> 
           } */}
          </div>
          }
        </div>
      </main>
    );
  };
  
  export default Home;