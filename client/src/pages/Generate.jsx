import ReadMeForm from "../components/ReadMeForm";
import { useLocation } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const Generate = () => {
  let { state } = useLocation();
  return (
    <div>
      <div className="createPage">
        Generate a README.md file for your project
      </div>
      <ReadMeForm {...state} />
    </div>
  );
};

export default Generate;
