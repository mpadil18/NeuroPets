import "./PetGallery.css"
import { useState, useEffect } from "react";
import {getUserInfo} from '../Backend/handleSubmit';
import { auth } from "../Backend/firebaseSetup.js";
import BigBunny from "../assets/elements/BigBunny.png"
function PetGallery() {
    const [goalPetList, setGoalPetList] = useState([]);

    useEffect(() => {
        const getPets = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    let tempArr = [];
                    const docSnap = await getUserInfo(user.uid);
                    if (docSnap && (docSnap.goal.length > 0)) {
                        let goalList = docSnap.goal;
                        goalList.forEach(element => tempArr.push({goal: element.goal, pet: element.pet}));
                        setGoalPetList(goalList);
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
                    goalPetList.map((goalPet) => (
                        <div className="PetCard">
                            <p className="PetName">Null</p>
                            <p className="CardGoalText">{goalPet.goal}</p>
                            <img src={BigBunny} style={{"width":125}} alt="Your pet"></img>
                            <button className="newBubbleButton">Null's Progress Logs</button>
                        </div>
                    )) : null
                }
                </div>
        </div>
   );
}

export default PetGallery;