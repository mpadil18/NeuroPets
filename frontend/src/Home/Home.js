import "./Home.css"
import ProfText from "../assets/ProfTextB.svg"
import GreenCheckmark from "../assets/GreenCheckmark.svg"
import { useEffect, useState } from "react";
import { getDoc, doc,} from "firebase/firestore"; 
import { auth, db} from "../Backend/firebaseSetup.js";

import { updateUserProgress } from "../Backend/handleSubmit";
import PetGallery from "../PetGallery/PetGallery";

function Home() {
    //const navigate = useNavigate();

    const [goalComplete, setGoalComplete] = useState(false);
    const [progressCounter, setProgressCount] = useState(0);
    const [userGoal, setUserGoal] = useState(null);
    const user = auth.currentUser; 


    const completeGoal = (e) => {
        setGoalComplete(true);
        setProgressCount(progressCounter + 1);
        updateUserProgress(user.uid, progressCounter);
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
                    
                    let goalArray = docSnap.data().goal;
                    let currGoal = goalArray[goalArray.length - 1].goal; // Accessing most recent goal
                    let progressCounter = goalArray[goalArray.length - 1].progressCounter;
                    
                    console.log("All user data: ", docSnap.data(), "Goal: ", currGoal);
                    console.log("Progress Counter", progressCounter);
                    
                    setUserGoal(currGoal);
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
            <PetGallery/>

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
        </div>
    );
}

export default Home;
