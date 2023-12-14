import Card from "../components/Card";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ALL_READMES, GET_SEARCHED_READMES } from "../utils/queries";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

const Home = () => {

  const { loading, data: allReadme } = useQuery(GET_ALL_READMES);

  let ReadMes = allReadme?.publishedReadmes || [];

  const [getSearch, {loading: searching, data: searchReadme }] = useLazyQuery(GET_SEARCHED_READMES)

  const [search, setSearch] = useState('');
  const [searched, setSearched] = useState([]);

  const handleInputChange = async (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
    if(event.target.value!==''){
      await getSearch( {variables:{query: event.target.value}})
    }
  }

  useEffect(()=>{
    if(searchReadme) {
      setSearched(searchReadme.searchReadmes);
    }
  },[searchReadme])

    return (
      <main>
        <div className="divy">
          {(loading || searching) ? 
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
          {search !== '' ? 
            <Card ReadMes={searched} /> :
            <Card ReadMes={ReadMes} /> 
           }
          </div>
          }
        </div>
      </main>
    );
  };
  
  export default Home;