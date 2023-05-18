import "./Home.css"
import ProfText from "../assets/branding/ProfTextB.svg"
import Pet from "../assets/branding/pet.svg"
import GreenCheckmark from "../assets/elements/GreenCheckmark.svg"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { getDoc, doc, updateDoc} from "firebase/firestore"; 
import { auth, db} from "../Backend/firebaseSetup.js";
import { signOut } from "firebase/auth"


function Home() {
    const navigate = useNavigate();

    const [goalComplete, setGoalComplete] = useState(false);
    const [progressCounter, setProgressCount] = useState(0);
    const [userGoal, setUserGoal] = useState(null);


    const updateCount = async () => {

        const user = auth.currentUser; 
    
        if(user){
             const docRef = doc(db, "all_data", user.uid);
             const docSnap = await getDoc(docRef);
             if (docSnap.exists()) {
            
                 var goals = docSnap.data().goal;
                 let goalIndex = docSnap.data().activeGoal;
                 let progressCount = goals[goalIndex].progressCounter + 1;
                 goals[goalIndex].progressCounter = progressCount;
                 await updateDoc(docRef, {
                     goal : goals
                 });
            }
        }      
    }

    const completeGoal = (e) => {
        setGoalComplete(true);
        setProgressCount(progressCounter + 1);
        
        updateCount();
    }

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
    const [isOpen, setIsOpen] = useState(false);
    function SignOutButton(){
        const authUser = auth;
        signOut(authUser).then(() => {
                navigate("../");
        }).catch((error) => {
                console.log(error);
        });
    }
    function setClosed() {
        setIsOpen(false);
    }
    function setOpen(){
        setIsOpen(true);
    }
    
    function Logout(){
        return (
        <>
        {isOpen && (
            <div className = "Popup">
                 <div className = "SignOutPopup1">
                     <div className = "SignOutPopup2" >
                                 <p className = "ConfirmSignOutText">Would you like to sign out?</p>
                             <button className = "ConfirmSignOutButton" onClick = {SignOutButton}>
                                 <p className = "OkayText">Okay</p>
                             </button>
                             <button className = "CancelSignOutButton" onClick = {setClosed}>
                                 <p className = "CancelText">Cancel</p>
                             </button>
                     </div>
                 </div>
             </div>
        )}
        </>
        );
    }
    useEffect(() => {
        const getAllData = async () => {
            const user = auth.currentUser;
            if (user) {
                // Getting user data specific to the current user
                const docRef = doc(db, 'all_data', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    // Gets the user's goal and saves to state
                    var goals = docSnap.data().goal;
                    let goalIndex = docSnap.data().activeGoal;
                    let progressCount = goals[goalIndex].progressCounter;
                    console.log("All user data: ", docSnap.data(), "Goal: ", goals[goalIndex]);
                    setUserGoal(goals[goalIndex].goal);
                    setProgressCount(progressCount);
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
                    <li className = "settingsIcon" onClick = {setOpen}/>
                </ul>
            </nav>
           <Logout/>
        </div>
    );
}

export default Home;