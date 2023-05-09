import "./CreateGoal.css"
import ProfText from "../assets/ProfTextA.svg"
import React, { useState } from "react"
import { auth, db} from "../Backend/firebaseSetup";
import { getDoc, doc, updateDoc} from "firebase/firestore"; 
import { useNavigate } from "react-router-dom"

const babyPetCodes = [0, 3, 6];
function CreateGoal() {

  const [goalText, setGoalText] = useState("");
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  
  const logState = () => {
    console.log(goalText); 
  }

  const assignRandomPet = () => {
    return babyPetCodes[Math.floor(Math.random()*babyPetCodes.length)];
  }

  const updateGoal = async () => {
    // Get user info, assign the pet, get timestamp
    const user = auth.currentUser;
    const pet = assignRandomPet();
    const startDate = new Date();
    const goalTuple = {goal: goalText, pet: pet, curr_date: startDate};
    if (user) {
      // Update the user's goal array by getting old data
      // and pushing the new goal to the list
      const docRef = doc(db, "all_data", user.uid);
      let docSnap = await getDoc(docRef);
      // get current array of tuples and push the new pair
      let tempArr = docSnap.data().goal;
      tempArr.push(goalTuple);
      await updateDoc(docRef, {
        goal: tempArr
      });

      // If update properly made, navigate user to Home
      docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          const latestGoal = (docSnap.data().goal)[(docSnap.data().goal).length - 1];
          if (latestGoal.goal === goalText && latestGoal.pet === pet) {
            navigate('../Home');
          }
          else {
            console.log("ERROR- not updated properly")
          }
      }

    }
  }
  
  const submithandler = (e) => {
    const user = auth.currentUser;
    e.preventDefault()
    console.log(goalText, user.uid)
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