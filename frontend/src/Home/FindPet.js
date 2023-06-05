import loading from "../assets/sprites/loading.png";
import { useEffect, useState } from "react";

function FindPet(props){

    const [petType, setPetType] = useState("");
    const [petStage, setPetStage] = useState(0);
    const [headgearID, setHeadgearID] = useState(0);
    const [neckwearID, setNeckwearID] = useState();
    const [fileExt, setFileExt] = useState("");
    

    const stage0 = 7;
    const stage1 = 28;
    const stage2 = 49;
    const stage3 = 60;

    useEffect(() => {
        if(props.currGoal != null){

            let progressCounter = (props.currGoal.progressCounter);
            let petNumber = (props.currGoal.pet);
            
            let headgear = 0;

            if(props.currGoal.wearingAccessories["headgear"] !== ""){

                headgear = props.currGoal.wearingAccessories["headgear"];

            }

            let neckwear = 0;

            if(props.currGoal.wearingAccessories["neckwear"] !== ""){

                neckwear = props.currGoal.wearingAccessories["neckwear"];

            }

            let hg_id = GetAccessoryID(headgear);
            setHeadgearID(hg_id);

            let nw_id = GetAccessoryID(neckwear);
            setNeckwearID(nw_id);

            let pet_type = GetPet(petNumber, progressCounter);
            setPetType(pet_type);

            let file = GetFileExt();
            
            setFileExt(file);

        }
    })

    function GetFileExt(){
        let file = "/Pet_Sprites/";
        
        if(petType === "egg")
            return (file + petType + ".png");
        
        if(petType === null)
            return (file + "loading.png")

        return  file + petType + "/" + petType + (petStage % 3) + "/" + petType + (petStage % 3) + "_" + headgearID + neckwearID + ".png";
        
    }

    function GetPet(petID, progressCount){
        
        if(progressCount <= stage0)
            return "egg";

        if(progressCount <= stage1){
            setPetStage(petID);
        }
        else if (progressCount <= stage2){
            setPetStage(petID + 1);
        }
        else if(progressCount <= stage3){
            setPetStage(petID + 2);
        }

        if(petID < 3)
            return "bunny";
        if(petID < 6)
            return "penguin";
        if(petID < 9)
            return "frog";
        if(petID === null)
            return "loading"
    }

    function GetAccessoryID(accString){
        if(accString === "Blue Cap"){
            return 1;
        }
        else if(accString === "Red Cap"){
            return 2;
        }
        else if(accString === "Orange Cap"){
            return 3;
        }
        else if(accString === "Cowboy Hat"){
            return 4;
        }
        else if(accString === "Pink Party Hat"){
            return 5;
        }
        else if(accString === "Green Party Hat"){
            return 6;
        }
        else if(accString === "Blue Party Hat"){
            return 7;
        }
        else if(accString === "Red Bandana"){
            return 1;
        }
        else if(accString === "Blue Bandana"){
            return 2;
        }
        else{
            return 0;
        }
    }

    function DisplayPet(){
        console.log(fileExt);
        if (fileExt === "") {
            return (<img className ="pet" src = {loading} alt = "loading pet" />)
        } else {
            return (<img className ="pet" src = {fileExt} alt = "retrieved pet" />)
        }
    }


    return (
        <DisplayPet></DisplayPet>
    );

}

export default FindPet;