import "./GoalCompleted.css"
import DisplayPet from "../Home/DisplayPet";
import { useNavigate } from "react-router-dom"

function GoalCompleted () {
    const navigate = useNavigate();
    const endCurrentGoalCycle = () => {
        // set active goal to zero
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