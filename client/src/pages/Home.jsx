import Card from "../components/Card";
import { useQuery } from "@apollo/client";
import { GET_ALL_READMES } from "../utils/queries";
import { useState } from "react";

const Home = () => {

  const { loading, data } = useQuery(GET_ALL_READMES);
  // console.log(data)
  const ReadMes = data?.publishedReadmes || [];
    return (
      <main>
        <div className="divy">
          {loading ? 
          <h2>loading</h2> : 
          <Card ReadMes={ReadMes} /> }
        </div>
      </main>
    );
  };
  
  export default Home;