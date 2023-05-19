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
  
  const submithandler = (e) => {
    e.preventDefault()
    
    if (goalText.length === 0){
      setErrorMsg("Please fill in a goal");
    } else {
      updateGoal();
    }
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

          {errorMsg && <p style={{margin: 0}}> Error: {errorMsg}</p>}

          <button className="bubbleButton" onClick = {submithandler}> 
            Save Goal
          </button>
        </div>

        <img className = "ProfessorText" src={ProfText} alt="Professor speech bubble"></img>

      </div>
    );
  }
  
  export default CreateGoal;