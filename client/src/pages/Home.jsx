import Card from "../components/Card";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ALL_READMES, GET_SEARCHED_READMES, GET_ME } from "../utils/queries";
import { useState, useEffect } from "react";

import { TextField } from "@mui/material";

const Home = () => {
  const { loading, data: allReadme } = useQuery(GET_ALL_READMES);
  const { loading: loadingUser, data: dataUser } = useQuery(GET_ME);

  let ReadMes = allReadme?.publishedReadmes || [];
  const User = dataUser?.me;

  const [getSearch, {loading: searching, data: searchReadme }] = useLazyQuery(GET_SEARCHED_READMES)

  const [search, setSearch] = useState('');
  const [searched, setSearched] = useState([]);

  const handleInputChange = async (event) => {
    // console.log(event.target.value)
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
        <TextField
                    id='search'  
                    label="Search"
                    value={search}
                    onChange={handleInputChange}
                    multiline
                    margin="normal"
                    sx={{width: '50%', marginLeft: '25%', marginRight: '25%', '& .MuiInputLabel-root.Mui-focused': {
                      color: '#a80038',
                    },
                    '& label.Mui-focused': {
                      color: '#a80038',
                    },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#a80038',
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#a80038',
                      },
                      '&:hover fieldset': {
                        borderColor: '#a80038',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#a80038',
                      },
                    
                  }}}
                    />
          {(loading || searching) ? 
          <h2>loading</h2> 
          : 
          <div className="homePage">
             
          {search !== '' ? 
            <Card ReadMes={searched} User={User} /> :
            <Card ReadMes={ReadMes} User={User} /> 
           }
          </div>
          }
        </div>
      </main>
    );
  };
  
  export default Home;