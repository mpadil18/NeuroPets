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
        <div className="InputBubble">
          <p className="SmallBubbleHeader">Create Account</p>
            <TextBox placeholder="Username" />
            <TextBox placeholder="Password" />
            <TextBox placeholder="Confirm Password" />
          <button className="bubbleButton"
          onClick = {createGoal}  
          >Register</button> 
        </div>
      </div>
    );
}

export default RegPage;

