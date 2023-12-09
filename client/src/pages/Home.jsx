import Card from "../components/Card";

import { useState } from "react";

const Home = () => {
  
    return (
      <main>
        <div className="divy">
        <Card title={"testing"} description={"greanioup nvieoapnrg aerinug[naeoinvf ao[ienrgiua[ eonvfioe[aoienrg [aeaoiunfba [oiuerng "} github={"#"} deploy={"#"} username={"Mikey"}/>
        <Card title={"testing Again"} description={"whatsup"} github={"#"} deploy={"#"} username={"Mikey"}/>
        <Card title={"testing a third time"} description={"Im getting tired but i dont wanna stop"} github={"#"} deploy={"#"} username={"Lenny"}/>
        </div>
      </main>
    );
  };
  
  export default Home;