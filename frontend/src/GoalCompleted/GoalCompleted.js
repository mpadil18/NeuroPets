import "./GoalCompleted.css"
import DisplayPet from "../Home/DisplayPet";
import { updateUserInfo, getUserInfo } from '../Backend/handleSubmit';
import { auth } from "../Backend/firebaseSetup.js";
import { useNavigate } from "react-router-dom"
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';

function GoalCompleted () {
    const navigate = useNavigate();
    const endCurrentGoalCycle = () => {
        const user = auth.currentUser; 
        // set active goal to false to indicate that there are no active goals now that the current one is complete
        let timeStamp = (getUserInfo(user.uid)).lastProgressMade;
        updateUserInfo(user.uid, {activeGoal: 0, lastProgressMade : firebase.firestore.FieldValue.delete(timeStamp) });
        /*
        await updateDoc(docRef, {
            "goalArray": firebase.firestore.FieldValue.arrayRemove(currGoal),
            "lastProgressMade" : firebase.firestore.FieldValue.delete(timeStamp),
            "activeGoal": 0
        });
        */
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
            <DisplayPet/>
            <button onClick = {endCurrentGoalCycle} className = "GoalCompleteBubbleButton">Continue</button>
        </div>
    );
}

export default GoalCompleted;