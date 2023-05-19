import "./Home.css"
import ProfText from "../assets/branding/ProfTextB.svg"
import Pet from "../assets/branding/pet.svg"
import GreenCheckmark from "../assets/elements/GreenCheckmark.svg"
import { DeleteGoal } from "../DeleteGoal/DeleteGoal";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore"; 
import { auth, db} from "../Backend/firebaseSetup.js";
import { updateUserProgress } from "../Backend/handleSubmit";

function Home() {
    //const navigate = useNavigate();

    const [goalComplete, setGoalComplete] = useState(false);
    const [progressCounter, setProgressCount] = useState(0);
    const [userGoal, setUserGoal] = useState(null);
    const [isDeleteGoalOpen, setIsDeleteGoalOpen] = useState(false);
    const user = auth.currentUser; 


    const completeGoal = (e) => {
        setGoalComplete(true);
        setProgressCount(progressCounter + 1);
        updateUserProgress(user.uid, progressCounter);
    }

    const openDeleteGoal = (e) => {
        setIsDeleteGoalOpen(true);
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
        // Gets the user's latest goal and saves to state
        const getAllData = async () => {
            if (user) { // Getting user specific data 
                const docRef = doc(db, 'all_data', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    
                    let goal = docSnap.data().goal;
                    let progressCounter = docSnap.data().progressCounter;
                    //console.log("All user data: ", docSnap.data(), "Goal: ", goal);
                    setUserGoal(goal[goal.length - 1].goal);
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
                    <li onClick = {openDeleteGoal} className = "editGoalIcon"/>
                    <li className = "petHabitatIcon"/>
                    <li className = "homeIcon"/>
                    <li className = "shopIcon"/>
                    <li className = "settingsIcon"/>
                </ul>
            </nav>
            {isDeleteGoalOpen &&
                <DeleteGoal user={user} setIsDeleteGoalOpen={setIsDeleteGoalOpen}/>
            }
        </div>
    );
}

export default Home;
