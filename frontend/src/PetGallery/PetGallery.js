import "./PetGallery.css"
import { useState, useEffect } from "react";
import {useLocation, useNavigate } from "react-router-dom"
import {getUserInfo} from '../Backend/handleSubmit';
import { auth } from "../Backend/firebaseSetup.js";
import NavBar from "../Navbar/Navbar";
import DisplayPet from "../Home/DisplayPet";

import { useAutoAnimate } from '@formkit/auto-animate/react'

function PetGallery() {
    const navigate = useNavigate();

    const [animationParent] = useAutoAnimate()

    // If PetGallery is navigated to from another page (ex: Navbar)
    // then we get the data that the other page passed by using location
    // In this case, we get the list of goals passed from the Navbar
    const location = useLocation();
    const [cachedGoalArray] = useState((location.state) ? location.state.goalArray : []);
    
    // To easily pass goal and log data to the ViewPage, 
    // we store all goals in a list, and all log data in a list
    const [goalPetList, setGoalPetList] = useState([]);
    const [logsPerGoal, setLogsPerGoal] = useState([]);

    // Indexes into the proper logs associated with the goalID and
    // passes them to the ViewProgress component to render
    const navToViewProgress = (goalID) => {
        // Only allow user to navigate if they have logs for this goal
        if (logsPerGoal[goalID].length > 0) {
            navigate('/ViewProgress',{state:{goal:goalPetList[goalID].goal, goalArray:goalPetList, goalId: goalID}});
        }
        else {
            console.log("No logs yet");
        }
    }

    useEffect(() => {
        // Gets data from firebase and loads into the goalPetList and logsPerGoal
        // (Only called if we don't have cached data)
        const getFirebaseData = async () => {
            const user = auth.currentUser;
            if (user) {
                let tempArr = [];
                const docSnap = await getUserInfo(user.uid);
                if (docSnap && (docSnap.goalArray.length > 0)) {
                    let goalList = docSnap.goalArray;
                    let logList = [];
                    goalList.forEach(element => tempArr.push({goal: element.goal, pet: element.pet, logs: element.logs, progressCounter: element.progressCounter}));
                    // Iterate over new array of goals, and push each set of logs into our logList
                    tempArr.forEach(element => logList.push(element.logs));
                    setGoalPetList(goalList);
                    setLogsPerGoal(logList);
                }
            }
        }

        // Updates the goalPetList and the logsPerGoal based on user info
        const getPets = async () => {
            try {
                // Load cached data (if the user accesses page from navbar)
                if (cachedGoalArray !== undefined && cachedGoalArray !== null && cachedGoalArray.length > 0) {
                    let logList = [];
                    cachedGoalArray.forEach(element => logList.push(element.logs));
                    setGoalPetList(cachedGoalArray);
                    console.log(cachedGoalArray, logList)
                    setLogsPerGoal(logList);
                } 
                // No cached data (ex: the user doesn't access Pet Gallery 
                // from the Navbar, instead by typing the URL), get from firebase
                else {
                    getFirebaseData();
                }
            } catch (error) {
                console.log("error trying to get pets")
            }
        }
        getPets();
    }, [cachedGoalArray])

    return (
        <div className="PetGallery" >
                <p className = "HeaderBubble">My Pets</p>
                <div className="Gallery" ref = {animationParent}>
                {/* If the user has goals, then render PetCards for each goal/pet. Else, render nothing */}
                { (goalPetList.length > 0) ? 
                    goalPetList.map((goalPet, index) => (
                        <div className="PetCard" key={index}>
                            <p className="PetName">{goalPet.petName}</p>
                            <p className="CardGoalText">{goalPet.goal}</p>

                            <DisplayPet currGoal = {goalPet} style={{"height":100}} />

                            {(logsPerGoal[index].length > 0) ?
                                <button className="newBubbleButton" id={index} onClick={(e) => navToViewProgress(e.target.id)}>Progress Logs</button>
                                :
                                <button className="disabledBubbleButton" style={{"disabled":true}} id={index}>Progress Logs</button>
                            }
                        </div>
                    )) : null
                }
                </div>
            
            {/* Pass goalPetList to navbar, to emulate caching */}
            <NavBar goalArray={goalPetList}/>
        </div>
   );
}

export default PetGallery;