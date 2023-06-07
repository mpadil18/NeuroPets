import "./PetGallery.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import NavigationArrows from "../PetStore/NavigationArrows";
import { getUserInfo } from '../Backend/handleSubmit';
import { auth } from "../Backend/firebaseSetup";
import NavBar from "../Navbar/Navbar";
import FindPet from "../Home/FindPet";


function PetGallery() {

    const navigate = useNavigate();
    const [animationParent] = useAutoAnimate()

    // If PetGallery is navigated to from another page (ex: Navbar)
    // then we get the data that the other page passed by using location
    // In this case, we get the list of goals passed from the Navbar
    const location = useLocation();
    const [cachedGoalArray] = useState((location.state) 
                            ? location.state.goalArray : []);
    const [userPetPoints] = useState(location.state.petPoints);

    // To easily pass goal and log data to the ViewPage, 
    // we store all goals in a list, and all log data in a list
    const [goalPetList, setGoalPetList] = useState([]);
    const [logsPerGoal, setLogsPerGoal] = useState([]);


    const [displayedAccessoryRange, setDisplayedAccessoryRange] = useState([0, 4])

    // Indexes into the proper logs associated with the goalID and
    // passes them to the ViewProgress component to render
    const navToViewProgress = (goalID) => {

        // Only allow user to navigate if they have logs for this goal
        if (logsPerGoal[goalID].length > 0) {

            navigate('/ViewProgress',{state:{goal:goalPetList[goalID].goal,
                                      goalArray:goalPetList, goalId: goalID}});

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

                    goalList.forEach(element => tempArr.push({goal: element.goal, 
                                            pet: element.pet, logs: element.logs, 
                                            progressCounter: element.progressCounter}));

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

                if (cachedGoalArray !== undefined && cachedGoalArray !== null
                     && cachedGoalArray.length > 0) {

                    let logList = [];

                    cachedGoalArray.forEach(element => logList.push(element.logs));
                    
                    setGoalPetList(cachedGoalArray);

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

    const changeStoreViewFrwd = () => {

        setDisplayedAccessoryRange([displayedAccessoryRange[0] + 4, 
                                    displayedAccessoryRange[1] + 4]);

    }

    const changeStoreViewBkwd = () => {

        setDisplayedAccessoryRange([displayedAccessoryRange[0] - 4, 
                                    displayedAccessoryRange[1] - 4]);

    }

    return (

        <div className="CardDisplay" >

                <p className = "HeaderBubble">My Pets</p>

                <div className="Gallery" ref = {animationParent}>
                
                <div className="galleryContents">

                {/* If the user has goals, then render PetCards for each goal/pet. Else, render nothing */}
                { (goalPetList.length > 0) ? 

                    (goalPetList.slice(displayedAccessoryRange[0], displayedAccessoryRange[1])).map((goalPet, index) => (

                        <div className="ItemCard" key={index + displayedAccessoryRange[0]}>

                            <p className="ItemName">{goalPet.petName}</p>

                            <p className="ItemTextDesc">{goalPet.goal}</p>

                            <FindPet currGoal={goalPet} style={{"height":100}}/>

                            {(logsPerGoal[index + displayedAccessoryRange[0]].length > 0) ?

                                <button className="newBubbleButton" id={index + displayedAccessoryRange[0]} onClick={(e) => navToViewProgress(e.target.id)}>Progress Logs</button>
                                
                                :

                                <button className="disabledBubbleButton" style={{"disabled":true}} id={index + displayedAccessoryRange[0]}>Progress Logs</button>

                            }

                        </div>

                    )) : null
                }

                </div>
                
                </div>
                <NavigationArrows 

                    displayedRange={displayedAccessoryRange} 

                    backLimit={4} frwdLimit={goalPetList.length > 0 ? goalPetList.length : 0} 

                    backFunc={changeStoreViewBkwd}

                    frwdFunc={changeStoreViewFrwd}

                    middleComponent={null}/>

            {/* Pass goalPetList to navbar, to emulate caching */}
            <NavBar goalArray={goalPetList} petPoints={userPetPoints}/>

        </div>
        
   );
}

export default PetGallery;