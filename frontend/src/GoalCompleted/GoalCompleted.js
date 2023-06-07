import "./GoalCompleted.css"
import { auth } from "../Backend/firebaseSetup.js";
import { useNavigate, useLocation } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import DisplayPet from "../Home/DisplayPet";
import { updateUserInfo, getUserInfo } from "../Backend/handleSubmit";

function GoalCompleted () {

    const navigate = useNavigate();
    const location = useLocation();
    const props = location.state;

    const endCurrentGoalCycle = () => {

        const user = auth.currentUser; 

        // set active goal to false to indicate that there are no active goals now that the current one is complete
        let timeStamp = (getUserInfo(user.uid)).lastProgressMade;

        updateUserInfo(user.uid, {activeGoal: 0, lastProgressMade : firebase.firestore.FieldValue.delete(timeStamp) });

        // navigate back to home page
        navigate('../Home');
    }
    return (

        <div className = "GoalComplete">

            <div className = "GoalCompleteInputBubble">

                <div className = "GoalCompleteBubbleHeader">

                    <h1>Congratulations!</h1>
                    <p>You’ve worked towards your goal for 60 days. That’s an incredible accomplishment!</p>

                </div>

            </div>

            <DisplayPet currGoal = {props.currGoal} />

            <button onClick = {endCurrentGoalCycle} className = "GoalCompleteBubbleButton">Continue</button>
            
        </div>
    );
}

export default GoalCompleted;