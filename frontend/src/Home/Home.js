import "./Home.css"
import ProfText from "../assets/ProfTextB.svg"
import Pet from "../assets/pet.svg"
import GreenCheckmark from "../assets/GreenCheckmark.svg"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc, updateDoc} from "firebase/firestore"; 
import { auth, firestore, db} from "../Backend/firebaseSetup.js";
import { getDatabase } from "firebase/database";
import { signOut } from "firebase/auth"

function Home() {
    const navigate = useNavigate();

    const [goalComplete, setGoalComplete] = useState(false);
    const [progressCounter, setProgressCount] = useState(0);

    const updateCount = async () => {

        const user = auth.currentUser; 
    
        if(user){
             const docRef = doc(db, "all_data", user.uid);

             await updateDoc(docRef, {
                progressCounter : progressCounter + 1
            });
            console.log("inside if");
        }else{
            console.log("if failed");
        }
        
    }

    const completeGoal = (e) => {
        setGoalComplete(true);
        setProgressCount(progressCounter + 1);
        
        updateCount();
        
        
        //updateUserProgress(user);
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
                console.log("user signed out...attempting navigate");
                navigate("../");
        }).catch((error) => {
                console.log("sign out failed lmao");
                console.log(error);
        });
    }
    function setClosed() {
        setIsOpen(false);
    }
    function setOpen(){
        setIsOpen(true);
    }
    const [userGoal, setUserGoal] = useState(null);
    
    useEffect(() => {
        const getAllData = async () => {
            const user = auth.currentUser;
            if (user) {
                // Getting user data specific to the current user
                const docRef = doc(db, 'all_data', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    // Gets the user's goal and saves to state
                    let goal = docSnap.data().goal;
                    let progressCounter = docSnap.data().progressCounter;
                    console.log("All user data: ", docSnap.data(), "Goal: ", goal);
                    setUserGoal(goal);
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
                    <li className = "settingsIcon" onClick = {setOpen}/>
                </ul>
            </nav>
           {isOpen && (
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
           )}
        </div>
    );
}

export default Home;
