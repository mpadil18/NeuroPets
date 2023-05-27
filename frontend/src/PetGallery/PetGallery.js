import "./PetGallery.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import {getUserInfo} from '../Backend/handleSubmit';
import { auth } from "../Backend/firebaseSetup.js";
import NavBar from "../Navbar/Navbar";
import DisplayPet from "../Home/DisplayPet";

function PetGallery() {
    const [goalPetList, setGoalPetList] = useState([]);
    const [logsPerGoal, setLogsPerGoal] = useState([]);
    const navigate = useNavigate();

    // Indexes into the proper logs associated with the goal and
    // passes them to the ViewProgress component to render
    const navToViewProgress = (goalID) => {
        // Only allow user to navigate if they have logs for this goal
        if (logsPerGoal[goalID].length > 0) {
            navigate('/ViewProgress',{state:{logs:logsPerGoal[goalID], goal:goalPetList[goalID].goal}});
        }
        else {
            console.log("No logs yet");
        }
    }

    useEffect(() => {
        const getPets = async () => {
            try {
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
            } catch (error) {
                console.log("error trying to get pets")
            }
        }
        getPets();
    }, [])

    return (
        <div className="PetGallery">
                <p className = "HeaderBubble">My Pets</p>
                <div className="Gallery">
                { (goalPetList.length > 0) ? 
                    goalPetList.map((goalPet, index) => (
                        <div className="PetCard" key={index}>
                            <p className="PetName">Null</p>
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
            
            <NavBar/>
        </div>
   );
}

export default PetGallery;