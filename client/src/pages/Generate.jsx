import ReadMeForm from "../components/ReadMeForm";
import { useLocation } from "react-router-dom";

const Generate = () => {
  //passes through the reade me info to the readme form
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
