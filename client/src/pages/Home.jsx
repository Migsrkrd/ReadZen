import Card from "../components/Card";
import { useQuery } from "@apollo/client";
import { GET_ALL_READMES } from "../utils/queries";
import { useState } from "react";

const Home = () => {

  const { loading, data } = useQuery(GET_ALL_READMES);
  // console.log(data)
  const ReadMes = data?.allreadmes || [];
    return (
      <main>
        <div className="divy">
          {loading ? 
          <h2>loading</h2> : 
          <Card ReadMes={ReadMes} /> }
          {/* // ReadMes.map((readme)=> { */}
          {/* //   <div>
          //   <Card title={readme.title} description={readme.description} github={readme.repoLink} deploy={readme.deployedLink} username={readme.username} />
          //   <Card title={"testing Again"} description={"whatsup"} github={"#"} deploy={"#"} username={"Mikey"}/>
          //   </div>
          // })} */}
        {/* <Card title={"testing"} description={"greanioup nvieoapnrg aerinug[naeoinvf ao[ienrgiua[ eonvfioe[aoienrg [aeaoiunfba [oiuerng "} github={"#"} deploy={"#"} username={"Mikey"}/>
        
        <Card title={"testing a third time"} description={"Im getting tired but i dont wanna stop"} github={"#"} deploy={"#"} username={"Lenny"}/> */}
        </div>
      </main>
    );
  };
  
  export default Home;