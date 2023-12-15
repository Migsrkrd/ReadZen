import Card from "../components/Card";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ALL_READMES, GET_SEARCHED_READMES, GET_ME } from "../utils/queries";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";

const Home = () => {
  //gets all readmes
  const { loading, data: allReadme } = useQuery(GET_ALL_READMES);
  //gets user data
  const { loading: loadingUser, data: dataUser } = useQuery(GET_ME);

  //puts all published readmes in an array
  let ReadMes = allReadme?.publishedReadmes || [];
  const User = dataUser?.me;

  //query to get searched for reades
  const [getSearch, {loading: searching, data: searchReadme }] = useLazyQuery(GET_SEARCHED_READMES)

  //creates a use state for both the search bar and the searched for readmes
  const [search, setSearch] = useState('');
  const [searched, setSearched] = useState([]);

  //handles user typing in the input field
  const handleInputChange = async (event) => {
    setSearch(event.target.value)
    if(event.target.value!==''){
      //searches for th readme
      await getSearch( {variables:{query: event.target.value}})
    }
  }

  //sets the searched readmes
  useEffect(()=>{
    if(searchReadme) {
      setSearched(searchReadme.searchReadmes);
    }
  },[searchReadme])

    return (
      <main>
        <div className="divy">
          {/* creates a search box */}
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
            {/* displays the all published cards or the cards relevant to the users search */}
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