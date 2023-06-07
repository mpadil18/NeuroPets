import "./PetContract.css"
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
    const [userName, setUserName] = useState('');

    const submithandler = (e) => {

      e.preventDefault()

      console.log(location.state);

      if (petName.length === 0){
        setErrorMsg("Please enter in petname");
      } 

      else if (userName.length === 0) {
        setErrorMsg("Please enter in your name");
      }

      else {
        
        createNewGoal(user.uid, goalText, petName); 
        
        setTimeout(function(){
          navigate('../Home');
        }, 800);
        
      }
    }


    return(
      <div className="PetContract">

        <div className ="bubbleHeader">NeuroPet Adoption Form & Contract to Myself </div>

          <div className="InputBubble">
          
            <div className = "contractText">
              <p>

             I  <input placeholder="Name" className="bubbleField"

              value = {userName} onChange = {(e) => setUserName(e.target.value)}/> 
                vow to look after my NeuroPet

              <input placeholder="Enter Pet Name" className="bubbleField"

              value = {petName} onChange = {(e) => setPetName(e.target.value)}>

              </input>

              by working towards  everyday for 60 days. 

              </p>
              
              <p>I understand that my pet’s growth depends on my dedication to my goal.</p>

              <p>I will change, and achieve my goal, by signing up for it one day at a time, in a row.</p>

            </div>

          <div className="contractFooter">

            <div className = "TextBox1"> {formattedDate} <br/> Date </div>

            <div className = "TextBox2"> {petName} <br/> Witness   </div>

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