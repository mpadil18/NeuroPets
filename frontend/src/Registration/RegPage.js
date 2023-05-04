// Page code
import './RegPage.css';
import TextBox from "./textBox";
import TopText from "../assets/upperBubble.svg"
import { useNavigate } from "react-router-dom"
import BottomText from "../assets/lowerBubble.svg"

function RegPage() {
  const navigate = useNavigate();

  const createGoal = (e) => {
    navigate('../createGoal');
  }

    return (
      <div className="Registration">
        <div className="Imgbox">
          <img className = "Bubble" src={TopText} alt="top speech bubble"></img>
          <img className = "Bubble" src={BottomText} alt="bot speech bubble"></img>
        </div>
        <div className="Create-Account">
          Create Account <br></br>
          <label className="UserInfo">
            <TextBox placeholder="Username" />
          </label>
          <label className="UserInfo">
            <TextBox placeholder="Password" />
          </label>
          <label className="UserInfo">
            <TextBox placeholder="Confirm Password" />
          </label>
          <button type="button"
          onClick = {createGoal}  
          >Register</button> 
        </div>
      </div>
    );
}

export default RegPage;

