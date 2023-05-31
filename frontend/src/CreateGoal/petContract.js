
import React from "react"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../Backend/firebaseSetup";
import { createNewGoal } from "../Backend/handleSubmit";
// Props that need to be passed is goalText

function PetContract(props){

    const user = auth.currentUser;
    const goalText = props.location.state; 
    const [petName, setPetName] = useState(null);

    console.log(goalText);


    const submithandler = (e) => {
      e.preventDefault()
      
      if (goalText.length === 0){
        setErrorMsg("Please fill in a goal");
      } else {
        createNewGoal(user.uid, goalText, petName); // Call this function in the petContract instead
        setTimeout(function(){
          navigate('../Home');
        }, 500);
        
      }
    }


    return(
      <div className="PetContract">

        <div>
        NeuroPet Adoption Form & Contract to Myself
        
        I <input placeholder="Name"></input> vow to look after my NeuroPet

        <input placeholder="Enter Pet Name" value = {petName} onChange = {(e) => setPetName(e.target.value)}></input>
        by working towards {goalText} everyday for 60 days. 

        I understand that my pet’s growth depends on my dedication to my goal.

        I will change, and achieve my goal, by signing up for it one day at a time, in a row.

        </div>

        <button onClick = {submithandler}> 
            Sign here 
        </button>

      </div>  
    )
}

export default PetContract; 