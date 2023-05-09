import "./CreateGoal.css"
import ProfText from "../assets/ProfTextA.svg"
import React, { useState } from "react"
import handleSubmit from "../Backend/handleSubmit"
import { auth } from "../Backend/firebaseSetup"
import {setUserGoal} from "../Backend/handleSubmit"
import { useNavigate } from "react-router-dom"

function CreateGoal() {

  const [goalText, setGoalText] = useState("");
  const user = auth.currentUser;
  const navigate = useNavigate();

  const logState = () => {
    console.log(goalText); 
  }
  
  const submithandler = (e) => {
    e.preventDefault()
    console.log("setting goal for "+ user)
    // setUserGoal(user.uid,goalText )
    setGoalText("")
    navigate('../Home');
  }
    return (
      <div className="CreateGoal">
        <div className="InputBubble">
          <p className="BubbleHeader">Create Goal</p>
          <textarea className="bubbleField" rows="5" cols="33"
          placeholder="Example: Brush Teeth, Floss, Manage Addiction, Drink Water.."
          value={goalText}
          onChange = {(e) => setGoalText(e.target.value)}
          />

          <button className="bubbleButton" onClick = {submithandler}> 
            Save Goal
          </button>
        </div>

        <img className = "ProfessorText" src={ProfText} alt="Professor speech bubble"></img>

      </div>
    );
  }
  
  export default CreateGoal;