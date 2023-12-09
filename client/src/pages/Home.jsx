import Card from "../components/Card";

import { useState } from "react";

const Home = () => {
  
    return (
      <main>
        <div className="divy">
        <Card title={"testing"} description={"greanioup nvieoapnrg aerinug[naeoinvf ao[ienrgiua[ eonvfioe[aoienrg [aeaoiunfba [oiuerng "} github={"#"} deploy={"#"} username={"Mikey"}/>
        <Card title={"testing"} description={"whatsup"} github={"#"} deploy={"#"} username={"Mikey"}/>
        <Card title={"testing"} description={"whatsup"} github={"#"} deploy={"#"} username={"Lenny"}/>
        </div>
        
        <h1> Stuff Goes Here</h1>
      </main>
    );
  };
  
  export default Home;