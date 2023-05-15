import "./Home.css"
import ProfText from "../assets/branding/ProfTextB.svg"
import Pet from "../assets/branding/pet.svg"
import GreenCheckmark from "../assets/elements/GreenCheckmark.svg"
import Close from "../assets/elements/Close.svg"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"; 
import { auth } from "../Backend/firebaseSetup.js";
import { updateUserProgress } from "../Backend/handleSubmit";
import {updateUserInfo, getUserInfo} from '../Backend/handleSubmit';

function Home() {
    //const navigate = useNavigate();

    const [goalComplete, setGoalComplete] = useState(false);
    const [progressCounter, setProgressCount] = useState(0);
    const [userGoal, setUserGoal] = useState(null);
    const [popupDisplay, setPopupDisplay] = useState(false);
    const [currGoalId, setCurrGoalId] = useState(null);
    const [loggedProgress, setLoggedProgress] = useState("");
    const user = auth.currentUser;

    // When called, gets `lastProgressMade` date in db
    // and returns `true` if today.
    const checkIfProgressMadeToday = (someDate) => {  
        const today = new Date();
        return someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear()
    }

    // If user submits an entry for manually logging progress
    // then add to db and hide popup
    const logOptionalProgress = async () => {
        const logDate = new Date();
        if (user) {
            let docSnap = await getUserInfo(user.uid);
            let tempArr = docSnap.goal;
            tempArr[currGoalId].logs.push({"date": logDate, "log": loggedProgress});
            updateUserInfo(user.uid, {goal: tempArr});
            setPopupDisplay(false);
        }
    }

    const closePopup = () => {
        setPopupDisplay(false);
    }

    // Logs the date of completion in `lastProgressMade` and updates progress counter.
    // Then function triggers the `Log Entry?` popup
    const completeGoal = () => {
        const completedDate = new Date();
        setGoalComplete(true);
        setProgressCount(progressCounter + 1);
        updateUserProgress(user.uid, progressCounter);
        updateUserInfo(user.uid, {lastProgressMade: completedDate});
        setTimeout(function(){
            setPopupDisplay(true);
        }, 900);
    }

    // Conditionally displays progress button depending on if user has clicked or not
    function ProgressButton(){
        if (goalComplete) {
            return (
            <div>
                <img className = "GreenCheck" src = {GreenCheckmark} alt = "green checkmark"/>
                <div className = "CompleteGoal">
                    <p className = "CompleteGoalText1">+1</p>
                    <p className = "CompleteGoalText1">{progressCounter}/60 Days</p>
                </div>
            </div>
            );
        }
        else {
            return (
                <button className = "GoalButton" onClick = {completeGoal}>
                    <p className = "G1Text">{progressCounter}/60 Days</p>
                    <p className = "G2Text">Complete...?</p>
                </button>
            );
        }
    }
    
    useEffect(() => {
        // Gets the user's latest goal (indexing into last in array)
        // and saves to state
        const getAllData = async () => {
            if (user) { // Getting user specific data
                const docSnap = await getUserInfo(user.uid);
                if (docSnap) {
                    // When user first creates a goal, they don't have a 
                    // `lastProgressMade` attribute
                    if (docSnap.lastProgressMade === undefined) {
                        setGoalComplete(false);
                    }
                    else if (checkIfProgressMadeToday(docSnap.lastProgressMade.toDate())) {
                        setGoalComplete(true);
                    }
                    let goal = docSnap.goal;
                    let progressCounter = docSnap.progressCounter;
                    setUserGoal(goal[goal.length - 1].goal);
                    setCurrGoalId(goal.length - 1);
                    setProgressCount(progressCounter);
                }
            }
        }
    getAllData();
    })

    return (
        <div className = "Home">
            <div className = "GoalBubble">
                <p className = "BubbleText">{userGoal}</p>
            </div>
            <img className = "pet" src = {Pet} alt = "sample neuropet"/>
            <ProgressButton onClick = {completeGoal}></ProgressButton>
            {!goalComplete && <img className = "ProfessorText" src={ProfText} alt="Professor speech bubble"></img>}
            <nav className = "navbar">
                <ul className = "navlist">
                    <li className = "editGoalIcon"/>
                    <li className = "petHabitatIcon"/>
                    <li className = "homeIcon"/>
                    <li className = "shopIcon"/>
                    <li className = "settingsIcon"/>
                </ul>
            </nav>
            {popupDisplay &&
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
            }
        </div>
    );
}

export default Home;
