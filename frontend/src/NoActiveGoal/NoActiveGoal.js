import "./NoActiveGoal.css";
import { useNavigate } from "react-router-dom"

function NoActiveGoal () {
    const navigate = useNavigate();
    
    const createGoal = () => {
        console.log("here");
        navigate('../createGoal');
    }

    return (
        <div className = "NoActiveGoal">
            <div className= "InputBubble">
                <p className = "bubbleHeader"> You currently have no active goals </p>
                <button onClick = {createGoal} className = "bubbleButton">Create Goal</button>
            </div>
        </div>
    );
}

export default NoActiveGoal;