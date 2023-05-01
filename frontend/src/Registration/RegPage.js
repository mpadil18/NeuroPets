// Page code
import TextBox from "./textBox";
import './regPage.css';
import TopText from "../assets/upperBubble.svg"
import BottomText from "../assets/lowerBubble.svg"

function RegPage() {
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
          <button type="button">Register</button> 
        </div>
      </div>
    );
}

export default RegPage;

