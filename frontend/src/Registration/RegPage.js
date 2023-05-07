import './RegPage.css';
import TextBox from "./textBox";
import TopText from "../assets/upperBubble.svg"
import { useNavigate } from "react-router-dom"
import BottomText from "../assets/lowerBubble.svg"
import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function RegPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); // defines username state variable and assogns the function setUsername to be handled when 'handleUsernameChange' is triggered
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


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
    if (password !== confirmPassword) {
      // display error message to user if passwords do not match
      // ~~~ need to fill in still ~~~
    } else {
      // create new user account with Firebase Authentication
      createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;

          // navigates user to create goal page
          navigate('../CreateGoal');

        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // code for errormessages and such things ...
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
        <button className="bubbleButton"
        onClick = {createGoal}  
        >Register</button> 
      </div>
    </div>
  );
}

export default RegPage;