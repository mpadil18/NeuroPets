import "./PetStore.css"
import Close from "../assets/elements/Close.svg"
import ActiveIcon from "../assets/elements/ActiveIcon.png"
import { useState, useEffect } from "react";
import {updateUserInfo, getUserInfo} from '../Backend/handleSubmit';
import { auth } from "../Backend/firebaseSetup.js";

import DisplayPet from "../Home/DisplayPet";
import NavigationArrows from "./NavigationArrows";

function DressUp(props) {
    const user = auth.currentUser; 
    const [petArray] = useState(props.goalArray);
    const [displayedPetsRange, setDisplayedPetsRange] = useState([0, 5]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [accessoryToUse, setAccessoryToUse] = useState(props.selectedAccessory);
    const accessoriesByGearType = [["Blue Cap", "Orange Cap", "Red Cap", "Cowboy Hat", "Blue Party Hat", "Green Party Hat", "Pink Party Hat"], ["Blue Bandana", "Red Bandana"]]
    const [displayNextPopup, setDisplayNextPopup] = useState(false);

    const tryDressPet = () => {
        // Take the selectedPetId, access the goal array at that index,
        // access the `wearingAccessoriesArray` at the apparel code.
        // if pet has the same exact accessory, display popup text asking if it's ok to remove the apparel.
        // else: just make the update in the array, and push to firebase, and close this popup.
        console.log("Try and dress up!");
        console.log("Pet to dress: ", selectedPet)
        console.log("Accessory to use: ", accessoryToUse)
        console.log("All pets", petArray)
        // Reverse the pet array to get the one we want to access
        let petArrayToUpdate = (petArray.reverse())
        const petToDress = (petArray.reverse())[selectedPet]
        const accessoryStr = accessoryToUse[2]
        for (let gearType = 0; gearType < accessoriesByGearType.length; gearType++) {
            if (accessoriesByGearType[gearType].includes(accessoryStr)) {
                if (gearType === 0) {
                    // check if pet is wearing the accessory already
                    if (petToDress.wearingAccessories.headgear === accessoryStr) {
                        setDisplayNextPopup(true);
                        return 0;
                    } else {
                        petToDress.wearingAccessories.headgear = accessoryStr
                    }
                } else if (gearType === 1) {
                    if (petToDress.wearingAccessories.neckwear === accessoryStr) {
                        setDisplayNextPopup(true);
                        return 0;
                    } else {
                        petToDress.wearingAccessories.neckwear = accessoryStr
                    }
                }
                petArrayToUpdate[selectedPet] = petToDress;
                updateUserInfo(user.uid, {goalArray: petArrayToUpdate});
            }
        }
        console.log("Tada!", petArrayToUpdate)
        closePopup();
        setDisplayNextPopup(false);
    }

    const removeAccessory = () => {
        let petArrayToUpdate = (petArray.reverse())
        const petToDress = (petArray.reverse())[selectedPet]
        const accessoryStr = accessoryToUse[2]
        for (let gearType = 0; gearType < accessoriesByGearType.length; gearType++) {
            if (accessoriesByGearType[gearType].includes(accessoryStr)) {
                if (gearType === 0) {
                    petToDress.wearingAccessories.headgear = ""
                } else if (gearType === 1) {
                    petToDress.wearingAccessories.neckwear = ""
                }
                petArrayToUpdate[selectedPet] = petToDress;
                updateUserInfo(user.uid, {goalArray: petArrayToUpdate});
            }
        }
        console.log("Tada!", petArrayToUpdate)
        closePopup();
        setDisplayNextPopup(false);
    }
    const closePopup = () => {
        props.setPopupDisplay(false);
        setDisplayNextPopup(false);
    }
    const changeStoreViewFrwd = () => {
        setDisplayedPetsRange([displayedPetsRange[0] + 5, displayedPetsRange[1] + 5]);
    }

    const changeStoreViewBkwd = () => {
        setDisplayedPetsRange([displayedPetsRange[0] - 5, displayedPetsRange[1] - 5]);
    }

    useEffect(() => {
        // Takes the index of the PetOption that the user selected
        // and turns the background dark gray, and the rest of the
        // options as the default light gray
        // (Under a useEffect hook since we want to update the 
        // state everytime the displayedPetRange changes, otherwise 
        // the updates wouldn't be properly made.)
        setAccessoryToUse(props.selectedAccessory);
        const selectAPet = (indexOfPet) => {
            if (indexOfPet !== null) {
                var elements = document.getElementsByClassName("petOption");
                for (var i = 0; i < elements.length; i++) {
                    if (parseInt(elements[i].id) === indexOfPet) {
                        elements[i].style.backgroundColor = "#A6A6A6";
                    } else {
                        elements[i].style.backgroundColor = "#D9D9D9";
                    }
                }
                setSelectedPet(indexOfPet);
            }
        }
        selectAPet(selectedPet);
    }, [selectedPet, displayedPetsRange, props.popupDisplay, props.selectedAccessory])

    return (
    <div className="DressUp">
   <div className="Popup">
        <div className="InputBubble">
            <button className="close-btn" onClick={closePopup}><img src={Close} alt="close popup button"/></button>
            {displayNextPopup ?
                <>
                    <p className="BubbleHeader">Your pet is already wearing the {accessoryToUse[2]}. Do you want to remove it?</p>
                    <div className="spotlightPet">
                        <DisplayPet currGoal = {petArray[selectedPet]}/>
                    </div>
                    <div className="rowOfButtons">
                        <button className="newBubbleButton" onClick={removeAccessory}>Yes</button>
                        <button className="newBubbleButton" onClick={closePopup}>No</button>
                    </div>
                </>
                :
                <>
                <p className="BubbleHeader">Who to dress up in the<br/><span style={{"font-weight": "bold"}}>{accessoryToUse !== undefined ? accessoryToUse[2] : ""}</span>?</p>
                <div className="gridContents">
                    {/* Reverse order of petArray to show from latest to oldest */}
                    {(petArray.length > 0) ?
                        ((petArray.reverse()).slice(displayedPetsRange[0], displayedPetsRange[1])).map((pet, index) => (
                            <div className="petOption" id={index + displayedPetsRange[0]} key={index + displayedPetsRange[0]} onClick={() => setSelectedPet(index + displayedPetsRange[0])}>
                            <DisplayPet currGoal = {pet} />
                            {console.log(pet)}
                            <p className="petsName">Null</p>
                            {index + displayedPetsRange[0] === (0) ? <img className="activeIcon" src={ActiveIcon} alt="active pet" /> : null}
                            <p className="daysOld">{pet.progressCounter}/60d</p>
                            </div>
                        )) : null
                    }
                </div>
                {/* Using the navigation arrows component with our desired functionality for this popup */}
                <NavigationArrows 
                displayedRange={displayedPetsRange} 
                backLimit={5} frwdLimit={petArray.length - 1} 
                backFunc={changeStoreViewBkwd}
                frwdFunc={changeStoreViewFrwd}
                middleComponent={selectedPet === null ? 
                    <button className="disabledBubbleButton">Confirm</button> 
                    : 
                    <button className="newBubbleButton" onClick={tryDressPet}>Confirm</button>}
                />
                </>
            }
        </div>
    </div>
    </div>
   );
}

export default DressUp;