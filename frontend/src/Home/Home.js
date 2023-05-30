import "./Home.css"
import ProfText from "../assets/branding/ProfTextB.svg"
import GreenCheckmark from "../assets/elements/GreenCheckmark.svg"

import { useEffect, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore"; 
import { updateUserInfo } from '../Backend/handleSubmit';
import { auth, db} from "../Backend/firebaseSetup.js";
import DisplayPet from "./DisplayPet";
import NavBar from "../Navbar/Navbar";
import LogProgress from "../LogProgress/LogProgress"





function Home() {

    const [goalComplete, setGoalComplete] = useState(false);
    const [progressCounter, setProgressCount] = useState(0);
    const [userGoal, setUserGoal] = useState(null);
    const [currGoal, setCurrGoal] = useState(null);
    const [popupDisplay, setPopupDisplay] = useState(false);
    const [currGoalId, setCurrGoalId] = useState(null);
    const [progressTimestamp, setProgressTimestamp] = useState(null);
    const [goalArray, setGoalArray] = useState([])
    const [petPoints, setPetPoints] = useState(0);

    const updateCountAndProgressLogs = async (dateDone) => {
        try {
            const user = auth.currentUser;
            if(user){
                 const docRef = doc(db, "all_data", user.uid);
                 const docSnap = await getDoc(docRef);
                 if (docSnap.exists()) {
                     var goalArray = docSnap.data().goalArray;
                     let goalIndex = goalArray.length - 1;
                     let progressCount = goalArray[goalIndex].progressCounter + 1;
                     
                     goalArray[goalIndex].progressCounter = progressCount;
                     goalArray[goalIndex].petPoints += 5;
                     // Initializes the progress log to be empty upon completion
                     goalArray[goalIndex].logs.push({"date": dateDone, "log": ""});
                     await updateDoc(docRef, {
                        goalArray : goalArray,
                        
                     });
                     
                     // Updates goal array, to ensure update is made in Pet Gallery/View Progress
                     setGoalArray(goalArray);
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
        setProgressTimestamp(completedDate);
        const user = auth.currentUser; 
        setGoalComplete(true);
        setProgressCount(progressCounter + 1);
        setPetPoints(petPoints + 5);
        updateUserInfo(user.uid, {lastProgressMade: completedDate});
        updateCountAndProgressLogs(completedDate);
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
                    <p className = "CompleteGoalText1">{progressCounter}/60</p>
                    <p className = "ProgCountAndPetPointSubText">Days</p>
                </div>
            </div>
            );
        }
        else {
            return (
                <div className = "CompleteGoal">
                    <p className = "G1Text">{progressCounter}/60 Days</p>
                    <p className = "G2Text">Complete...?</p>
                </div>
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

            try {
                const user = auth.currentUser;
                if (user) {
                    // Getting user data specific to the current user
                    const docRef = doc(db, 'all_data', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        // Sets the current state of whether the goal is complete
                        checkIfGoalComplete(docSnap.data().lastProgressMade);
                        
                        // Gets the user's goal and saves to state
                        let goalArray = docSnap.data().goalArray;
                        let goalIndex = goalArray.length - 1;
                        let currGoal = goalArray[goalIndex].goal;

                        let progressCounter = goalArray[goalIndex].progressCounter;

                        let petPoints = docSnap.data().petPoints;
                        
                        setCurrGoal(goalArray[goalIndex]);

                        setUserGoal(currGoal);
                        setCurrGoalId(goalArray.length - 1);              
                        setProgressCount(progressCounter);
                        setGoalArray(goalArray);
                        setPetPoints(petPoints);
                    }

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


            <div className = "PetEnvironmentHeader">
               
                <div className = "PetHeader">
                    <DisplayPet/>
                </div>
                
                <div className = "WindowTextBox1">
                    <p className = "WindowText">Day</p>
                    <p className = "WindowText">{progressCounter}</p>
                </div>

                <div className = "WindowTextBox2">
                    <p className = "WindowText">Points</p>
                       
                </div>

                <div className = "WindowTextBox3">
                    <p className = "WindowText">{petPoints}</p>
                </div>    

            </div>
           

            <ProgressButton onClick = {completeGoal}></ProgressButton>
            {!goalComplete && <img className = "ProfessorText" src={ProfText} alt="Professor speech bubble"></img>}
            {popupDisplay &&
            <LogProgress currGoalId={currGoalId} setPopupDisplay={setPopupDisplay} progressTimestamp={progressTimestamp} setGoalArray={setGoalArray}/>
            }

         
            {/* Pass goalPetList to navbar, to emulate caching */}
            <NavBar goalArray={goalArray}/>
        </div>
    );
}

export default Home;