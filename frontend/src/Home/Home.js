import "./Home.css"
import ProfText from "../assets/branding/ProfTextB.svg"
import Pet from "../assets/branding/pet.svg"
import GreenCheckmark from "../assets/elements/GreenCheckmark.svg"
import { useEffect, useState } from "react";
import { getDoc, doc, updateDoc} from "firebase/firestore"; 
import { updateUserInfo } from '../Backend/handleSubmit';
import { auth, db} from "../Backend/firebaseSetup.js";
import NavBar from "../Navbar/Navbar";
import LogProgress from "../LogProgress/LogProgress"


function Home() {

    const [goalComplete, setGoalComplete] = useState(false);
    const [progressCounter, setProgressCount] = useState(0);
    const [userGoal, setUserGoal] = useState(null);
    const [popupDisplay, setPopupDisplay] = useState(false);
    const [currGoalId, setCurrGoalId] = useState(null);


    const updateCount = async () => {
        try {
            const user = auth.currentUser;
            if(user){
                 const docRef = doc(db, "all_data", user.uid);
                 const docSnap = await getDoc(docRef);
                 if (docSnap.exists()) {
                
                     var goalArray = docSnap.data().goal;
                     let goalIndex = goalArray.length - 1
                     let progressCount = goalArray[goalIndex].progressCounter + 1;
                     goalArray[goalIndex].progressCounter = progressCount;
                     await updateDoc(docRef, {
                         goal : goalArray
                     });
                }
            }     
        } catch (error) {
            console.log("ERROR ON UPDATE COUNT");
        } 
    }

    // When called, gets `lastProgressMade` date in db
    // and returns `true` if today.
    const checkIfProgressMadeToday = (someDate) => {  
        const today = new Date();
        return (someDate.getDate() === today.getDate() &&
               someDate.getMonth() === today.getMonth() &&
               someDate.getFullYear() === today.getFullYear());

    }

    // Logs the date of completion in `lastProgressMade` and updates progress counter.
    // Then function triggers the `Log Entry?` popup
    const completeGoal = () => {
        const completedDate = new Date();
        const user = auth.currentUser; 
        setGoalComplete(true);
        setProgressCount(progressCounter + 1);
        updateUserInfo(user.uid, {lastProgressMade: completedDate});
        setTimeout(function(){
            setPopupDisplay(true);
        }, 900);
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
  
    
    useEffect(() => {
        const checkIfGoalComplete = (lastProgressDate) => {
            // When user first creates a goal, they don't have a 
            // `lastProgressMade` attribute
            if (lastProgressDate === undefined) {
                setGoalComplete(false);
            }
            else if (checkIfProgressMadeToday(lastProgressDate.toDate())) {
                setGoalComplete(true);
            }
        }
        const getAllData = async () => {

            const user = auth.currentUser;
            if (user) {
                // Getting user data specific to the current user
                const docRef = doc(db, 'all_data', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    // Gets the user's goal and saves to state
                    var goalArray = docSnap.data().goalArray;
                    let goalIndex = goalArray.length - 1;
                    let progressCount = goalArray[goalIndex].progressCounter;
                    console.log("All user data: ", docSnap.data(), "Goal: ", goalArray[goalIndex]);
                    setUserGoal(goalArray[goalIndex].goal);
                    setProgressCount(progressCount);
                }
            } catch (error) {
                console.log("ERROR GETTING ALL DATA");
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
            {popupDisplay &&
            <LogProgress currGoalId={currGoalId} setPopupDisplay={setPopupDisplay}/>
            }
            <NavBar/>
        </div>
    );
}

export default Home;