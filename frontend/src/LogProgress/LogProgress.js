import Close from "../assets/elements/Close.svg"
import {updateUserInfo, getUserInfo} from '../Backend/handleSubmit';
import { auth } from "../Backend/firebaseSetup.js";
import { useState } from "react";

function LogProgress(props) {
    const user = auth.currentUser; 
    // If user submits an entry for manually logging progress
    // then add to db and hide popup
    const [loggedProgress, setLoggedProgress] = useState("");
    const closePopup = () => {
        props.setPopupDisplay(false);
    }
    
    const logOptionalProgress = async () => {
        const logDate = new Date();
        try {
            if (user) {
                let docSnap = await getUserInfo(user.uid);
                let tempArr = docSnap.goal;
                tempArr[props.currGoalId].logs.push({"date": logDate, "log": loggedProgress});
                updateUserInfo(user.uid, {goal: tempArr});
                closePopup();
            }

        } catch (error) {
            console.log("ERROR LOGGING PROGRESS");
        }
    }   
    return (
   <div className="Popup">
        <div className="InputBubble">
            <button className="close-btn" onClick={closePopup}><img src={Close} alt="close popup button"/></button>
            <p className="BubbleHeader">Journal Entry?</p>
            <textarea className="bubbleField" rows="5" cols="33"
            placeholder="Example: I read 5 pages of “The Four Agreements”, I jogged with my friend for 30 minutes..."
            value={loggedProgress}
            onChange = {(e) => setLoggedProgress(e.target.value)}
            />
            <button className="bubbleButton" onClick={logOptionalProgress}> 
                Log in Journal
            </button>
        </div>
    </div>
   );
}

export default LogProgress;