import ReadMeForm from "../components/ReadMeForm";
import { useLocation } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const Generate = () => {
    let { state } = useLocation()
    return (
        <>        
        <h1>Generate README goes here</h1>
        <ReadMeForm {...state}/>
        </>
    )
}

export default Generate;