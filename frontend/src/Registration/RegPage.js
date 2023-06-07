import './RegPage.css';
import TextBox from "./textBox";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../Backend/firebaseSetup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {createUserDb} from "../Backend/handleSubmit";
import TopText from "../assets/elements/upperBubble.svg";
import BottomText from "../assets/elements/lowerBubble.svg";

function RegPage({ setIsSignedIn }) {

  const navigate = useNavigate();

  const [username, setUsername] = useState(''); // defines username state variable and assigns the function setUsername to be handled when 'handleUsernameChange' is triggered
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // these are event handlers that trigger when any of the input fields are modified, i.e. a user typing in their information
  // called due to on change modifiers to the textbox divs below
  const handleUsernameChange = (value) => {

    setUsername(value);

  }

  const handlePasswordChange = (value) => {

    setPassword(value);

  }

  const handleConfirmPasswordChange = (value) => {

    setConfirmPassword(value);

  }


  const createGoal = (e) => {

    if (username.length === 0|| password.length === 0 ||confirmPassword.length === 0 ){

      setErrorMsg("Empty field detected")

    }

    else if (password !== confirmPassword ) {

      setErrorMsg("Passwords not matching ")

    }

    else if (confirmPassword.length < 5){

      setErrorMsg("Passwords not matching ")

    } else {

      // create new user account with Firebase Authentication
      createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {

          var user = userCredential.user;

          createUserDb(user.uid, user.email)

          setIsSignedIn(true)

          navigate('../DoctorIntro');

        })

        .catch((error) => {

          var errorCode = error.code;
          
          if (errorCode === 'auth/email-already-in-use') {
            setErrorMsg("Email already in use");
          } 

          else if(errorCode === 'auth/invalid-email') {
            setErrorMsg("Enter a valid email address");
          }

          else if (errorCode === 'auth/weak-password'){
            setErrorMsg("Enter a stronger password");
          }

          else{
            setErrorMsg("Please refresh your page");
          }
         
        });

    }

  }

  return (

    <div className="Registration">

      <div className="Imgbox">

        <img className = "Bubble" src={TopText} alt="top speech bubble"></img>

        <img className = "Bubble" src={BottomText} alt="bot speech bubble"></img>

      </div>

      <div className="InputBubble">

        <p className="SmallBubbleHeader">Create Account</p>

          <TextBox placeholder="Email" onChange={handleUsernameChange} />

          <TextBox placeholder="Password" onChange={handlePasswordChange} />

          <TextBox placeholder="Confirm Password" onChange={handleConfirmPasswordChange} />

          {errorMsg && <p> Error: {errorMsg}</p>}

        <button className="bubbleButton"
        onClick = {createGoal}  
        >Register</button> 

      </div>

    </div>

    );
    
}

export default RegPage;

