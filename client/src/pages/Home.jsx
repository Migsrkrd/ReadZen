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
          <div className="homePage">
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