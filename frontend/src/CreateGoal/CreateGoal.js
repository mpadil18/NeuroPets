import "./CreateGoal.css"
import ProfText from "../assets/ProfTextA.svg"
import React, { useState } from "react"

function CreateGoal() {

  const [goalText, setGoalText] = useState("");
  
  const logState = () => {
    console.log(goalText); 
  }

    return (
      <div className="CreateGoal">
        <div className="CreateGoalBubble">
          <p className="BubbleHeader">Create Goal</p>
          <textarea className="GoalText" rows="5" cols="33"
          placeholder="Example: Brush Teeth, Floss, Manage Addiction, Drink Water.."
          value={goalText}
          onChange = {(e) => setGoalText(e.target.value)}
          />

          <button className="BubbleButton" onClick = {logState}> 
            Save Goal
          </button>
        </div>

        <img className = "ProfessorText" src={ProfText} alt="Professor speech bubble"></img>

      </div>
    );
  }
  
  export default CreateGoal;