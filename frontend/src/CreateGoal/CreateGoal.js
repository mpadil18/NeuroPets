import "./CreateGoal.css"
import ProfText from "../assets/ProfTextA.svg"
import React, { useState } from "react"
import handleSubmit from "../Backend/handleSubmit"

function CreateGoal() {

  const [goalText, setGoalText] = useState("");
  
  const logState = () => {
    console.log(goalText); 
  }
  
  const submithandler = (e) => {
    e.preventDefault()
    handleSubmit(goalText)
    setGoalText("")
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

          <button className="bubbleButton"> 
            Save Goal
          </button>
        </div>

        <img className = "ProfessorText" src={ProfText} alt="Professor speech bubble"></img>

      </div>
    );
  }
  
  export default CreateGoal;