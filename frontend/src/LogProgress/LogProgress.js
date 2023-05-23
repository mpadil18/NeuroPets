import "./LogProgress.css"
import Close from "../assets/elements/Close.svg"
import {updateUserInfo, getUserInfo} from '../Backend/handleSubmit';
import { auth } from "../Backend/firebaseSetup.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

function LogProgress(props) {
    const navigate = useNavigate();
    const user = auth.currentUser; 
    // If user submits an entry for manually logging progress
    // then add to db and hide popup
    const [loggedProgress, setLoggedProgress] = useState("");
    const [errorMsg, setErrorMsg] = useState(false);
    const closePopup = () => {
        props.setPopupDisplay(false);
        // if progressCount reaches 60 days, navigate to the congrats screen
        let progressCount = props.progressCounter;
        const desiredProgressDays = 60;
        if (progressCount == desiredProgressDays) {
            console.log("congrats!");
            navigate('/goalCompleted');
        }
    }
    
    const logUserProgress = async () => {
        const logDate = new Date();
        try {
            if (user) {
                let docSnap = await getUserInfo(user.uid);
                let tempArr = docSnap.goalArray;
                tempArr[props.currGoalId].logs.push({"date": logDate, "log": loggedProgress});
                updateUserInfo(user.uid, {goalArray: tempArr});
                closePopup();
            }

        } catch (error) {
            setErrorMsg(true);
        }
    }   
    return (
   <div className="Popup">
        <div className="InputBubble">
            <button className="close-btn" onClick={logUserProgress}><img src={Close} alt="close popup button"/></button>
            <p className="BubbleHeader">Journal Entry?</p>
            <textarea className="bubbleField" rows="5" cols="33"
            placeholder="Example: I read 5 pages of “The Four Agreements”, I jogged with my friend for 30 minutes..."
            value={loggedProgress}
            onChange = {(e) => setLoggedProgress(e.target.value)}
            />
            <button className="bubbleButton" onClick={logUserProgress}> 
                Log in Journal
            </button>
            { errorMsg && <p style={{margin: 0}}> Error logging progress</p>}
        </div>
    </div>
   );
}

export default LogProgress;