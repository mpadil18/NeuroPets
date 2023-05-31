import "./CreateGoal.css"
import React, { useState } from "react"
import { auth } from "../Backend/firebaseSetup";
import { useNavigate } from "react-router-dom"
import ProfText from "../assets/branding/ProfTextA.svg"; 
import { createNewGoal } from "../Backend/handleSubmit";

function CreateGoal() {

  const [goalText, setGoalText] = useState("");
  const [errorMsg, setErrorMsg] = useState('');
  const [presetGoals] = useState(["Eat Healthier", "Be More Active", "Improve Mental Health", "Focus on Relationships", 
  "Dedicate Time to a Hobby", "Learn an Instrument", "Be More Tidy"])

  const navigate = useNavigate();
  const user = auth.currentUser;

  const setPresetFunc = (id) => {
    // Function used for all preset goals 
    setGoalText(presetGoals[Number(id)]);
    const listOfButts = document.getElementsByClassName("presetbtn");
    for (let i = 0; i < listOfButts.length; i++) {
      listOfButts[i].style.backgroundColor = "#374350";
    }
    document.getElementById(id).style.backgroundColor = "#152130";
  }
  
  const submithandler = (e) => {
    e.preventDefault()
    
    if (goalText.length === 0){
      setErrorMsg("Please fill in a goal");
    } else {
      createNewGoal(user.uid, goalText);
      setTimeout(function(){
        navigate('../Home');
      }, 500);
      
    }
  }


  const accordionClick = (accId) => {
    // Conditionally displaying an accordian based on the user choice - 
    if (accId === "customGoal") { 
      document.getElementById("presetGoalDrop").style.display = "none";
      if (document.getElementById("customGoalDrop").style.display === "inline-block") {
        document.getElementById("customGoalDrop").style.display = "none";
      }
      else {
        document.getElementById("customGoalDrop").style.display = "inline-block";
      }
    } 
    else { // Otherwise display presetGoal dropdown
      document.getElementById("customGoalDrop").style.display = "none";
      if (document.getElementById("presetGoalDrop").style.display === "inline-block") {
        document.getElementById("presetGoalDrop").style.display = "none";
      }
      else {
        document.getElementById("presetGoalDrop").style.display = "inline-block";
      }
    }
    const listOfButts = document.getElementsByClassName("presetbtn");
    for (let i = 0; i < listOfButts.length; i++) {
      listOfButts[i].style.backgroundColor = "#374350";
    }
    setGoalText("");
} 

    return (
      <div className="CreateGoal">
        <div className="InputBubble">
          <p className="BubbleHeader">Create Goal</p>

          <button id="customGoal" className="bubbleButton accordion" onClick = {(e) => accordionClick(e.target.id)}> 
            Custom Goal
          </button>
          <textarea id="customGoalDrop" className="bubbleField" rows="12" cols="33"
          placeholder="Example: Brush Teeth, Floss, Manage Addiction, Drink Water.."
          value={goalText}
          onChange = {(e) => setGoalText(e.target.value)}
          />

          <button id="presetGoal" className="bubbleButton accordion" onClick = {(e) => accordionClick(e.target.id)}> 
            Preset Goal
          </button>
          <div className="presets" id="presetGoalDrop">
            <button id="0" className="bubbleButton presetbtn" onClick = {(e) => setPresetFunc(e.target.id)}> 
            Eat Healthier
            </button>
            <button id="1" className="bubbleButton presetbtn" onClick = {(e) => setPresetFunc(e.target.id)}> 
            Be More Active
            </button>
            <button id="2" className="bubbleButton presetbtn" onClick = {(e) => setPresetFunc(e.target.id)}> 
            Improve Mental Health
            </button>
            <button id="3" className="bubbleButton presetbtn" onClick = {(e) => setPresetFunc(e.target.id)}> 
            Focus on Relationships
            </button>
            <button id="4" className="bubbleButton presetbtn" onClick = {(e) => setPresetFunc(e.target.id)}> 
            Dedicate Time to a Hobby
            </button>
            <button id="5" className="bubbleButton presetbtn" onClick = {(e) => setPresetFunc(e.target.id)}> 
            Learn an Instrument
            </button>
            <button id="6" className="bubbleButton presetbtn" onClick = {(e) => setPresetFunc(e.target.id)}> 
            Be More Tidy
            </button>
          </div>

          {errorMsg && <p style={{margin: 0}}> Error: {errorMsg}</p>}

          <button className="bubbleButton submission" onClick = {submithandler}> 
            Save Goal
          </button>
        </div>

        <img className = "ProfessorText" src={ProfText} alt="Professor speech bubble"></img>

      </div>
    );
  }
  
  export default CreateGoal;