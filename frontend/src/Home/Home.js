import "./Home.css"
import ProfText from "../assets/ProfTextB.svg"
import Pet from "../assets/pet.svg"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getDoc, doc} from "firebase/firestore"; 
import { auth, firestore, db} from "../firebase.js";


function Home() {
    const navigate = useNavigate();

    const completeGoal = (e) => {
        //navigate('../CompleteGoal');
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
                    console.log("All user data: ", docSnap.data(), "Goal: ", goal);
                    setUserGoal(goal);
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
            <button className = "GoalButton" onClick = {completeGoal}>
                <p className = "G1Text">1/60 Days</p>
                <p className = "G2Text">Complete...?</p>
                
            </button>
            <img className = "ProfessorText" src={ProfText} alt="Professor speech bubble"></img>
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
