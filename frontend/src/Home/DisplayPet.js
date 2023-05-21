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

import { useEffect, useState } from "react";
import { auth, db} from "../Backend/firebaseSetup.js";
import { getDoc, doc,} from "firebase/firestore"; 

function DisplayPet() {

    const user = auth.currentUser;
    const [petId, setPetId] = useState(-1);

    const stage0 = 7;
    const stage1 = 28;
    const stage2 = 49;
    const stage3 = 60;


    useEffect(() => {

        const getUserData = async () => {
            if (user) { // Getting user specific data 
                const docRef = doc(db, 'all_data', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    let goalArray = docSnap.data().goalArray;
                    let goalIndex = goalArray.length - 1;
                    let currGoal = goalArray[goalIndex];
                    
                    let petNum = currGoal.pet; 
                    let progressCounter = currGoal.progressCounter;

                    if (progressCounter <= stage0){
                        setPetId(10);
                    }
                    else if(progressCounter <= stage1){
                        setPetId(petNum);
                    }
                    else if (progressCounter <= stage2){
                        setPetId( petNum + 1);
                    }
                    else if  (progressCounter <= stage3){
                        setPetId(petNum + 2);
                    }
                }
            }
        }
    getUserData();

    })

 function GetPet(){
    // Need to add loading icon 
    if (petId === -1){
        return (<img className = "pet" src = {loading} alt= "loading"/> )
        }
    if (petId === 10){
        return (<img className = "pet" src = {egg} alt= "stage 0 "/> )
        }
    if (petId === 0){ // Bunny 
        return ( <img className = "pet" src = {bunny1} alt= "bunny stage 1"/>)
    }
    if (petId === 1){
        return ( <img className = "pet" src = {bunny2} alt= "bunny stage 2"/>)
    }
    if (petId === 2){
        return ( <img className = "pet" src = {bunny3} alt= "bunny stage 3"/>)
    }
    if (petId === 3){ // Penguin
        return ( <img className = "pet" src = {penguin1} alt= "penguin stage 1"/>)
    }
    if(petId === 4){
        return ( <img className = "pet" src = {penguin2} alt= "penguin stage 2"/>)
    }
    if(petId === 5){
        return (<img className = "pet" src = {penguin3} alt= "penguin stage 3"/>)
    }
    if (petId === 6){ // Frog
        return ( <img className = "pet" src = {frog1} alt= "frog stage 1"/>)
    }
    if (petId === 7){
        return ( <img className = "pet" src = {frog2} alt= "frog stage 2"/>)
    }
    if (petId === 8){
        return (<img className = "pet" src = {frog3} alt= "frog stage 3"/>)
    }

 }
    return (
     <div> 
        <GetPet></GetPet>
    </div>
       
    );
}

export default DisplayPet;