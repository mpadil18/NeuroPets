import "./Home.css";
import ProfText from "../assets/branding/ProfTextB.svg";
import Pet from "../assets/branding/pet.svg";
import GreenCheckmark from "../assets/elements/GreenCheckmark.svg";
import { useEffect, useState } from "react";
import { getDoc, doc, updateDoc} from "firebase/firestore"; 
import { auth, db} from "../Backend/firebaseSetup.js";

function Home() {
    //const navigate = useNavigate();

    const [goalComplete, setGoalComplete] = useState(false);
    const [progressCounter, setProgressCount] = useState(0);
    const [userGoal, setUserGoal] = useState(null);


    const updateCount = async () => {
        const user = auth.currentUser; 
    
        if(user){
             const docRef = doc(db, "all_data", user.uid);
             const docSnap = await getDoc(docRef);
             if (docSnap.exists()) {
            
                 var goalArray = docSnap.data().goalArray;
                 let goalIndex = goalArray.length - 1;
                 let progressCount = goalArray[goalIndex].progressCounter + 1;
                 goalArray[goalIndex].progressCounter = progressCount;
                 await updateDoc(docRef, {
                    goalArray: goalArray
                 });
            }
        }      
    }

    const completeGoal = (e) => {
        setGoalComplete(true);
        setProgressCount(progressCounter + 1);
        updateCount();
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
        const getAllData = async () => {
            const user = auth.currentUser;
            if (user) {
                // Getting user data specific to the current user
                const docRef = doc(db, 'all_data', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    let goalArray = docSnap.data().goalArray;
                    let goalIndex = goalArray.length - 1;
                    let currGoal = goalArray[goalIndex].goal;
                    let progressCounter = goalArray[goalIndex].progressCounter;
                    
                    console.log("All user data: ", docSnap.data(), "Goal: ", currGoal);
                    console.log("Progress Counter", progressCounter);
                    
                    setUserGoal(currGoal);
                    setProgressCount(progressCounter);

                }
            }
        }
        getAllData();
    }, []);


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
        </div>
    );
}

export default Home;
