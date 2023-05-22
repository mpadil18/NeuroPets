import "./PetGallery.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import {getUserInfo} from '../Backend/handleSubmit';
import { auth } from "../Backend/firebaseSetup.js";
import bunny1 from "../assets/sprites/bunny1.png";
import bunny2 from "../assets/sprites/bunny2.png";
import bunny3 from "../assets/sprites/bunny3.png";

import egg from "../assets/sprites/egg.png";
import loading from "../assets/sprites/loading.png";

import penguin1 from "../assets/sprites/penguin1.png";
import penguin2 from "../assets/sprites/penguin2.png";
import penguin3 from "../assets/sprites/penguin3.png";

import frog1 from "../assets/sprites/frog1.png";
import frog2 from "../assets/sprites/frog2.png";
import frog3 from "../assets/sprites/frog3.png";
import NavBar from "../Navbar/Navbar";

function PetGallery() {
    const [goalPetList, setGoalPetList] = useState([]);
    const [logsPerGoal, setLogsPerGoal] = useState([]);
    const [petImgsByCode] = useState([bunny1, bunny2, bunny3, penguin1, penguin2, penguin3, frog1, frog2, frog3])
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
                            <img src={(goalPet.progressCounter < 8) ? egg : petImgsByCode[goalPet.pet]} style={{"width":100}} alt="Your pet"></img>
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