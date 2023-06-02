import NavBar from "../Navbar/Navbar";
import "./PetStore.css"
import babybunny from "../assets/PetStoreItems/babybunny.png";
import babyfrog from "../assets/PetStoreItems/babyfrog.png";
import babypenguin from "../assets/PetStoreItems/babypenguin.png";

import bandanaBlue from "../assets/PetStoreItems/bandanaBlue.png";
import bandanaRed from "../assets/PetStoreItems/bandanaRed.png";

import capBlue from "../assets/PetStoreItems/capBlue.png";
import capOrange from "../assets/PetStoreItems/capOrange.png";
import capRed from "../assets/PetStoreItems/capRed.png";
import cowboyhat from "../assets/PetStoreItems/cowboyhat.png";
import partyhatBlue from "../assets/PetStoreItems/partyhatBlue.png";
import partyhatGreen from "../assets/PetStoreItems/partyhatGreen.png";
import partyhatPink from "../assets/PetStoreItems/partyhatPink.png";

import Key from "../assets/elements/Key.png";

import DressUp from "./DressUp.js"
import NavigationArrows from "./NavigationArrows"
import loading from "../assets/sprites/loading.png";
import Close from "../assets/elements/Close.svg"

import {updateUserInfo, getUserInfo} from '../Backend/handleSubmit';
import { auth } from "../Backend/firebaseSetup.js";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"

function PetStore() {
    const location = useLocation();
    const test = [{
        "goal": "Learn an Instrument",
        "petName": "",
        "progressCounter": 0,
        "pet": 3,
        "wearingAccessories": [
            "",
            "",
            ""
        ],
        "logs": [],
        "currDate": {
            "seconds": 1685575297,
            "nanoseconds": 205000000
        },
        "petPoints": 0
    },
    {
        "goal": "Learn an Instrument",
        "petName": "",
        "progressCounter": 0,
        "pet": 3,
        "wearingAccessories": [
            "",
            "",
            ""
        ],
        "logs": [],
        "currDate": {
            "seconds": 1685575297,
            "nanoseconds": 205000000
        },
        "petPoints": 0
    },
    {
        "goal": "Learn an Instrument",
        "petName": "",
        "progressCounter": 0,
        "pet": 3,
        "wearingAccessories": [
            "",
            "",
            ""
        ],
        "logs": [],
        "currDate": {
            "seconds": 1685575297,
            "nanoseconds": 205000000
        },
        "petPoints": 0
    },
    {
        "goal": "Learn an Instrument",
        "petName": "",
        "progressCounter": 0,
        "pet": 3,
        "wearingAccessories": [
            "",
            "",
            ""
        ],
        "logs": [],
        "currDate": {
            "seconds": 1685575297,
            "nanoseconds": 205000000
        },
        "petPoints": 0
    },
    {
        "goal": "Learn an Instrument",
        "petName": "",
        "progressCounter": 0,
        "pet": 3,
        "wearingAccessories": [
            "",
            "",
            ""
        ],
        "logs": [],
        "currDate": {
            "seconds": 1685575297,
            "nanoseconds": 205000000
        },
        "petPoints": 0
    },
    {
        "goal": "Learn an Instrument",
        "petName": "",
        "progressCounter": 0,
        "pet": 3,
        "wearingAccessories": [
            "",
            "",
            ""
        ],
        "logs": [],
        "currDate": {
            "seconds": 1685575297,
            "nanoseconds": 205000000
        },
        "petPoints": 0
    },
    {
        "goal": "Learn an Instrument",
        "petName": "",
        "progressCounter": 0,
        "pet": 3,
        "wearingAccessories": [
            "",
            "",
            ""
        ],
        "logs": [],
        "currDate": {
            "seconds": 1685575297,
            "nanoseconds": 205000000
        },
        "petPoints": 0
    }]
    //We map the type of accessory to the appropriate ranges provided in the pet store
    // (Ex: all elements from indexes 0-6 are headgear, all from indexes 7-8 are neckwear)
    const accessoriesByGearType = [{headgear: [0, 6]}, {neckwear: [7, 8]}]
    // Each pair is the accessory with the price
    const accessories = [[capBlue, 25, "Blue Cap", "Your pet will feel fly in this!"], [capOrange, 25, "Orange Cap", "Your pet will feel fly in this!"], [capRed, 25, "Red Cap", "Your pet will feel fly in this!"], [cowboyhat, 50, "Cowboy Hat", "Your pet will feel fly in this!"], [partyhatBlue, 35, "Blue Party Hat", "Your pet will feel fly in this!"], [partyhatGreen, 35, "Green Party Hat", "Your pet will feel fly in this!"], [partyhatPink, 35, "Pink Party Hat", "Your pet will feel fly in this!"], [bandanaBlue, 20, "Blue Bandana", "Your pet will feel fly in this!"], [bandanaRed, 20, "Red Bandana", "Your pet will feel fly in this!"]]

    //Last accessory = item 9.
    // If the last item of displayed < 8, then display front arrow
    // that changes the indexes by factor of 4 (ex: next is 1, 4)
    const [displayedAccessoryRange, setDisplayedAccessoryRange] = useState([0, 4])
    const [userPetPoints, setUserPetPoints] = useState((location.state) ? (location.state.petPoints) : 0);
    const [selectedAccessory, setSelectedAccessory] = useState(null);
    const [popupDisplay, setPopupDisplay] = useState(false);
    const user = auth.currentUser;

    const changeStoreViewFrwd = () => {
        setDisplayedAccessoryRange([displayedAccessoryRange[0] + 4, displayedAccessoryRange[1] + 4]);
    }

    const changeStoreViewBkwd = () => {
        setDisplayedAccessoryRange([displayedAccessoryRange[0] - 4, displayedAccessoryRange[1] - 4]);
    }

    const dressUpPet = (accessoryId) => {
        setSelectedAccessory(accessories[accessoryId]);
        setPopupDisplay(true);
    }

    return (
   <div className="PetStore">
    <p className="HeaderBubble">Pet Store</p>
    <div className="Gallery">
        <div className="galleryContents">
        {(accessories.slice(displayedAccessoryRange[0], displayedAccessoryRange[1])).map((itemAndPrice, index) => (
            <div className="AccessoryCard" key={index + displayedAccessoryRange[0]}>
                <p className="AccessoryName">{itemAndPrice[2]}</p>
                <p className="CardAccessoryText">{itemAndPrice[3]}</p>
                <img src={itemAndPrice[0]} style={{"height":100}} alt="anItem"/>
                {/* This dressUpPet function should be called on the dress up button instead, but it's being tested as a plain button for now */}
                <button className="newBubbleButton" id={index + displayedAccessoryRange[0]} onClick={(e) => dressUpPet(e.target.id)}><img src={Key} alt="key"/><span className="priceTag" id={index + displayedAccessoryRange[0]}>{itemAndPrice[1]} pts</span></button>
            </div>
        ))}
        </div>
    </div>
    <NavigationArrows 
        displayedRange={displayedAccessoryRange} 
        backLimit={4} frwdLimit={9} 
        backFunc={changeStoreViewBkwd}
        frwdFunc={changeStoreViewFrwd}
        middleComponent={<p className="petPointsDisplay">{(userPetPoints)} pts</p>}/>
    {popupDisplay && <DressUp goalArray={test} selectedAccessory={selectedAccessory} popupDisplay={popupDisplay} setPopupDisplay={setPopupDisplay}/>}
    <NavBar goalArray={userPetPoints}/>
   </div>
   );
}

export default PetStore;