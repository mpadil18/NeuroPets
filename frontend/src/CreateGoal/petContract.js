import "./petContract.css"
import "../App.css";
import React from "react"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../Backend/firebaseSetup";
import { createNewGoal } from "../Backend/handleSubmit";
import { useLocation } from 'react-router-dom';

// Props that need to be passed is goalText
function PetContract(){

    const navigate = useNavigate();
    const location = useLocation();
    const user = auth.currentUser;
    const {goalText} = location.state || {};


    const today = new Date();
    const formattedDate = today.toLocaleDateString();

    const [errorMsg, setErrorMsg] = useState('');
    const [petName, setPetName] = useState('');


    const submithandler = (e) => {
      e.preventDefault()
      console.log(location.state);
      if (petName.length === 0){
        setErrorMsg("Please fill in a goal");
      } else {
        createNewGoal(user.uid, goalText, petName); 

        // Data Race Occurs here. 
        // setTimeout(function(){
        //   navigate('../Home');
        // }, 800);
        
      }
    }


    return(
      <div className="PetContract">

        <div className ="bubbleHeader">NeuroPet Adoption Form & Contract to Myself </div>

          <div className="contractBox">
          
            <div className = "contractText">
              I <input placeholder="Name" className="InputBubble"/> vow to look after my NeuroPet

              <input placeholder="Enter Pet Name" className="InputBubble"
              value = {petName} onChange = {(e) => setPetName(e.target.value)}></input>
              by working towards  everyday for 60 days. 

              I understand that my pet’s growth depends on my dedication to my goal.

              I will change, and achieve my goal, by signing up for it one day at a time, in a row.
            </div>

          <div className="contractFooter">

          <div className = "WindowTextBox1"> {formattedDate} <br/> Date </div>
          <div className = "WindowTextBox2"> {petName} <br/> Witness   </div>
          </div>

        </div>
      
        <button onClick = {submithandler} className="bubbleButton"> 
            Submit Contract Here 
        </button>

        {errorMsg && <p> Error: {errorMsg}</p>}
      </div>  
    )
}

export default PetContract; 