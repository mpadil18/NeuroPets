import Close from "../assets/elements/Close.svg"
import {updateUserInfo, getUserInfo} from '../Backend/handleSubmit';
import { useState } from "react";

function LogProgress(props) {
    // If user submits an entry for manually logging progress
    // then add to db and hide popup
    const [loggedProgress, setLoggedProgress] = useState("");
    const closePopup = () => {
        props.setPopupDisplay(false);
    }
    
    const logOptionalProgress = async () => {
        const logDate = new Date();
        if (props.user) {
            let docSnap = await getUserInfo(props.user.uid);
            let tempArr = docSnap.goal;
            tempArr[props.currGoalId].logs.push({"date": logDate, "log": loggedProgress});
            updateUserInfo(props.user.uid, {goal: tempArr});
            closePopup();
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