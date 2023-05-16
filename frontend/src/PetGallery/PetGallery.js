import bunny1 from "../assets/sprites/bunny1.png";
import bunny2 from "../assets/sprites/bunny2.png";
import bunny3 from "../assets/sprites/bunny3.png";

import egg from "../assets/sprites/egg.png";

import penguin1 from "../assets/sprites/penguin1.png";
import penguin2 from "../assets/sprites/penguin2.png";
import penguin3 from "../assets/sprites/penguin3.png";

import frog1 from "../assets/sprites/frog1.png";
import frog2 from "../assets/sprites/frog2.png";
import frog3 from "../assets/sprites/frog3.png";

import { useEffect, useState } from "react";
import { auth, db} from "../Backend/firebaseSetup.js";
import { getDoc, doc,} from "firebase/firestore"; 

function PetGallery() {

    const user = auth.currentUser;
    const [petID, setPetID] = useState(null);

    useEffect(() => {
        console.log("In use effects")
        const getUserData = async () => {
            if (user) { // Getting user specific data 
                const docRef = doc(db, 'all_data', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    let goal = docSnap.data().goal;
                    setPetID(goal[goal.length - 1].pet);
                    console.log(petID);
                    //console.log("All user data: ", docSnap.data(), "Pet number: ", goal[goal.length - 1].pet);
                }
            }
        }
    getUserData();

    })
 /*
 Logic 
 - Set pet as loading if you are trying to fetch the user infor
 - Implement code such that you are only load the data once 
 - Conditionally show pet dependent on value 
 
 */
    return (
     <div 
     style={{backgroundColor: 'pink'}}>
          <img className = "pet" src = {egg} alt= "stage 0 "/>
          <img className = "pet" src = {bunny1} alt= "bunny stage 1"/>
          <img className = "pet" src = {bunny2} alt= "bunny stage 1"/>
          <img className = "pet" src = {bunny3} alt= "bunny stage 2"/>
          <img className = "pet" src = {penguin1} alt= "penguin stage 1"/>
          <img className = "pet" src = {penguin2} alt= "penguin stage 2"/>
          <img className = "pet" src = {penguin3} alt= "penguin stage 3"/>
          <img className = "pet" src = {frog1} alt= "bunny stage 1"/>
          <img className = "pet" src = {frog2} alt= "bunny stage 1"/>
          <img className = "pet" src = {frog3} alt= "bunny stage 2"/>
    </div>
    );
}

export default PetGallery;