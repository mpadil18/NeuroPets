import "./CreateGoal.css"
import React, { useState } from "react"
import { auth } from "../Backend/firebaseSetup";
import { useNavigate } from "react-router-dom"
import {updateUserInfo, getUserInfo} from '../Backend/handleSubmit';
import ProfText from "../assets/branding/ProfTextA.svg"; 

const babyPetCodes = [0, 3, 6];
function CreateGoal() {

  const [goalText, setGoalText] = useState("");
  const [errorMsg, setErrorMsg] = useState('');
  const [presetGoals] = useState(["Eat Healthy", "Be Active", "Improve Mental Health", "Focus on Relationships", 
  "Dedicate Time to a Hobby", "Learn an Instrument", "Maintain a Tidied Space"])

  const navigate = useNavigate();

  const assignRandomPet = () => {
    return babyPetCodes[Math.floor(Math.random()*babyPetCodes.length)];
  }

  const onUpdateNavigate = async (newData) => {
      // Retrieve most recent goal to error check.
      // If update properly made, navigate user to Home
      const user = auth.currentUser;
      const docSnap = await getUserInfo(user.uid);
      if (docSnap) {
        const latestGoal = (docSnap.goalArray)[(docSnap.goalArray).length - 1];

          if (latestGoal.goal === newData.goal && latestGoal.pet === newData.pet) {
            navigate('../Home');
          }
          else {
            console.log("ERROR- not updated properly")
          }
      }
  }

  const updateGoal = async () => {
    // Get user info, assign the pet, get timestamp
    // and save (goal, pet) as an object
    const user = auth.currentUser;
    const pet = assignRandomPet();
    const startDate = new Date();
    const goalTuple = {goal: goalText, pet: pet, curr_date: startDate, progressCounter: 0, logs:[]};
    if (user) {
      // Update the user's goal array by getting old data
      // and pushing the new goal to the list
      let docSnap = await getUserInfo(user.uid);
      let tempArr = docSnap.goalArray;
      tempArr.push(goalTuple);

      updateUserInfo(user.uid, {goalArray: tempArr});
      // If update properly made, navigate to home
      onUpdateNavigate(goalTuple);
    }
  }

  const setPresetFunc = (id) => {
    console.log(presetGoals[Number(id)])
    setGoalText(presetGoals[Number(id)]);
  }
  
  const submithandler = (e) => {
    e.preventDefault()
    console.log("I GOT CALLED");
    
    if (goalText.length === 0){
      setErrorMsg("Please fill in a goal");
    } else {
      updateGoal();
    }
  }


  const accordionClick = (accId) => {
    if (accId === "customGoal") {
      document.getElementById("presetGoalDrop").style.display = "none";
      if (document.getElementById("customGoalDrop").style.display === "inline-block") {
        document.getElementById("customGoalDrop").style.display = "none";
      }
      else {
        document.getElementById("customGoalDrop").style.display = "inline-block";
      }
    } 
    else {
      document.getElementById("customGoalDrop").style.display = "none";
      if (document.getElementById("presetGoalDrop").style.display === "inline-block") {
        document.getElementById("presetGoalDrop").style.display = "none";
      }
      else {
        document.getElementById("presetGoalDrop").style.display = "inline-block";
      }
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
          <textarea id="customGoalDrop" className="bubbleField" rows="5" cols="33"
          placeholder="Example: Brush Teeth, Floss, Manage Addiction, Drink Water.."
          value={goalText}
          onChange = {(e) => setGoalText(e.target.value)}
          />

          <button id="presetGoal" className="bubbleButton accordion" onClick = {(e) => accordionClick(e.target.id)}> 
            Preset Goal
          </button>
          <div className="presets" id="presetGoalDrop">
            <button id="0" className="bubbleButton" onClick = {(e) => setPresetFunc(e.target.id)}> 
            Eat Healthy
            </button>
            <button id="1" className="bubbleButton" onClick = {(e) => setPresetFunc(e.target.id)}> 
            Be Active
            </button>
            <button id="2" className="bubbleButton" onClick = {(e) => setPresetFunc(e.target.id)}> 
            Improve Mental Health
            </button>
            <button id="3" className="bubbleButton" onClick = {(e) => setPresetFunc(e.target.id)}> 
            Focus on Relationships
            </button>
            <button id="4" className="bubbleButton" onClick = {(e) => setPresetFunc(e.target.id)}> 
            Dedicate Time to a Hobby
            </button>
            <button id="5" className="bubbleButton" onClick = {(e) => setPresetFunc(e.target.id)}> 
            Learn an Instrument
            </button>
            <button id="6" className="bubbleButton" onClick = {(e) => setPresetFunc(e.target.id)}> 
            Maintain a Tidied Space
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