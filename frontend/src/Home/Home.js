import "./Home.css"
import ProfText from "../assets/branding/ProfTextB.svg"
import GreenCheckmark from "../assets/elements/GreenCheckmark.svg"

import { useEffect, useState } from "react";
import { getUserInfo, updateUserInfo } from '../Backend/handleSubmit';
import { auth } from "../Backend/firebaseSetup.js";
import FindPet from "./FindPet";
import NavBar from "../Navbar/Navbar";
import LogProgress from "../LogProgress/LogProgress"
import NoActiveGoal from "../NoActiveGoal/NoActiveGoal";
import { presetGoals, goalData } from "../Backend/presetData.js";

//Animation antics:
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { motion } from "framer-motion";

function Home() {


    //Animation contents   ~~~~~~~~
    const [animationParent] = useAutoAnimate()

    const [shouldShake, setShouldShake] = useState(false);

    const hopAnimation = {

        y: [0, -10, 0],

        transition: {

            duration: 1.5,
            repeat: Infinity,

            y: {

                type: "spring",
                stiffness: 20,
                damping: 2,

            },

        },

    };

    const shakeAnimation = shouldShake

        ? {
            x: [0, 10, -10, 10, -10, 0],
            transition: { duration: 1.0 },
        }

        : {};

    

    //End of animation data ~~~~~~~
    
    //States to contain user data
    //

        //array that holds entire list of users goals
        const [goalArray, setGoalArray] = useState([]);
        
        //states that hold variables local to the current goal
        const [currGoal, setCurrGoal] = useState(null);
        const [userGoalName, setUserGoalName] = useState(null);
        const [activeGoal, setActiveGoalExists] = useState(true);
        const [goalIndex, setGoalIndex] = useState(0);
        const [progressCounter, setProgressCount] = useState(0);

        //states that hold variables local to the user
        const [goalComplete, setGoalComplete] = useState(false);
        const [petPoints, setPetPoints] = useState(0);
        const [progressTimestamp, setProgressTimestamp] = useState(null);

        const [popupDisplay, setPopupDisplay] = useState(false);
    
    
    //
    //end user states

    // When called, gets `lastProgressMade` date in db
    // and returns `true` if today.
    const checkIfProgressMadeToday = (someDate) => { 

        const today = new Date();

        return (someDate.getDate() === today.getDate() &&
               someDate.getMonth() === today.getMonth() &&
               someDate.getFullYear() === today.getFullYear());
    }

    // When called, checks if the CurrGoal in the goalArray
    // is a presetGoal and returns the associated goals if true.
    const isPresetGoal = (someGoal) => {
        
        for (let i = 0; i < presetGoals.length; i++) {
            
            if (presetGoals[i] === someGoal)
                return i;

        }

        return false;
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

        var _goalArray = goalArray;
        _goalArray[goalIndex].logs.push({"date": completedDate, "log": ""});
        _goalArray[goalIndex].progressCounter += 1;

        updateUserInfo(user.uid, {lastProgressMade : completedDate, 
                                  goalArray : _goalArray,
                                  petPoints : petPoints + 5});

        setGoalArray(_goalArray);


        setTimeout(function(){
            setPopupDisplay(true);
        }, 900);

        setShouldShake(true)

    }

    // Conditionally displays progress button depending on if user has clicked or not
    function ProgressButton(){

        if (goalComplete) {

            return (

            <div>

                <img className = "GreenCheck" src = {GreenCheckmark} alt = "green checkmark"/>

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

            try {

                const user = auth.currentUser;

                if (user) {
                    
                    // Getting user data specific to the current user
                    const userData =  await getUserInfo(user.uid);

                    if (userData !== null) {
                        
                        // Sets the state to whether there are active goals or not
                        // the !! is used to convert the retrieved value from 0/1 to true/false
                        setActiveGoalExists(!!(userData.activeGoal));
                        
                        // Sets the current state of whether the goal is complete
                        checkIfGoalComplete(userData.lastProgressMade);
                        
                        // Gets the user's goal and saves to state
                        let goalIndex = userData.goalArray.length - 1;
                        let currGoalName = userData.goalArray[goalIndex].goal;
                        
                        setGoalIndex(goalIndex);
                        setCurrGoal(userData.goalArray[goalIndex]);
                        setGoalArray(userData.goalArray);

                        if (isPresetGoal(currGoalName) === false) {
                            setUserGoalName(currGoalName);
                        }
                        
                        else {
                            setUserGoalName(goalData[isPresetGoal(currGoalName)][((new Date().getDate())*3)%10]);
                        }
          
                        setProgressCount(userData.goalArray[goalIndex].progressCounter);
                        setPetPoints(userData.petPoints);
                 
                    }

                }

            } catch (error) {

                console.log(error);
                console.log("ERROR GETTING ALL DATA");

            }

        }

        getAllData();

    }, []);

    return (

        <div className = "Home">

            {activeGoal &&
            <div className = "ActiveGoal" ref = {animationParent}>
               
            <div className = "GoalBubble">
                   
                    <p className = "BubbleText">{userGoalName}</p>
                    
            </div>
    

            <div className = "PetEnvironmentHeader">
               
                <div className = "PetHeader">

                   <motion.div animate={{ ...shakeAnimation, ...hopAnimation }}>

                    <FindPet currGoal={currGoal}/>
                    
                    </motion.div>
                    
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

                <LogProgress ref = {animationParent} currGoal = {currGoal} currGoalId={goalIndex} 
                                                     setPopupDisplay={setPopupDisplay} progressCounter={progressCounter} 
                                                     progressTimestamp={progressTimestamp} setGoalArray={setGoalArray}/>

                }
            
            </div>

            }

            {!activeGoal && <NoActiveGoal/>}   
         
            <NavBar goalArray={goalArray} petPoints={petPoints}/>

        </div>

    );

}

export default Home;