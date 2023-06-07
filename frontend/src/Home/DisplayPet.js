import { useEffect, useState } from "react";
import bunny1 from "../assets/sprites/bunny1.png";
import bunny2 from "../assets/sprites/bunny2.png";
import bunny3 from "../assets/sprites/bunny3.png";
import penguin1 from "../assets/sprites/penguin1.png";
import penguin2 from "../assets/sprites/penguin2.png";
import penguin3 from "../assets/sprites/penguin3.png";
import frog1 from "../assets/sprites/frog1.png";
import frog2 from "../assets/sprites/frog2.png";
import frog3 from "../assets/sprites/frog3.png";
import egg from "../assets/sprites/egg.png";
import loading from "../assets/sprites/loading.png";

// Props to be passed - Current user gola
function DisplayPet(props) {

    const [petId, setPetId] = useState(10);
    const [petImgsByCode] = useState([bunny1, bunny2, bunny3, penguin1, penguin2, penguin3, frog1, frog2, frog3,egg, loading]);

    // Assigning constants for pet transformation
    const stage0 = 7;
    const stage1 = 28;
    const stage2 = 49;
    const stage3 = 60;
    const eggIndex = 9; 

    useEffect(() => {     

        if (props.currGoal !== null){ // When curr goal is 
            let petNum = props.currGoal.pet; 
            let progressCounter = props.currGoal.progressCounter;
            
            if (progressCounter <= stage0){  // Egg stage 
                setPetId(eggIndex); 
            }
            else if(progressCounter <= stage1){
                setPetId(petNum);
            }
            else if (progressCounter <= stage2){
                setPetId(petNum + 1);
            }
            else if  (progressCounter <= stage3){
                setPetId(petNum + 2);
            }
        }
    }, [setPetId, props.currGoal])

    function GetPet(){
        return (<img className ="pet" src = {petImgsByCode[petId]} alt = "pet stage"/>)
    }

    return (
     <> 
        <GetPet></GetPet>
    </>    
    );
}

export default DisplayPet;