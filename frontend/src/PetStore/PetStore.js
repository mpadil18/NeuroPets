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

import backArrow from "../assets/elements/backArrow.png";
import frwdArrow from "../assets/elements/frwdArrow.png";
import Key from "../assets/elements/Key.png";

import loading from "../assets/sprites/loading.png";
import Close from "../assets/elements/Close.svg"

import {updateUserInfo, getUserInfo} from '../Backend/handleSubmit';
import { auth } from "../Backend/firebaseSetup.js";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"

function PetStore() {
    const location = useLocation();
    // Each pair is the accessory with the price
    const accessories = [[capBlue, 25, "Blue Cap", "Your pet will feel fly in this!"], [capOrange, 25, "Orange Cap", "Your pet will feel fly in this!"], [capRed, 25, "Red Cap", "Your pet will feel fly in this!"], [cowboyhat, 50, "Cowboy Hat", "Your pet will feel fly in this!"], [partyhatBlue, 35, "Blue Party Hat", "Your pet will feel fly in this!"], [partyhatGreen, 35, "Green Party Hat", "Your pet will feel fly in this!"], [partyhatPink, 35, "Pink Party Hat", "Your pet will feel fly in this!"], [bandanaBlue, 20, "Blue Bandana", "Your pet will feel fly in this!"], [bandanaRed, 20, "Red Bandana", "Your pet will feel fly in this!"]]
    console.log((location.state) ? location.state.goalArray : [])
    //Last accessory = item 9.
    // If the last item of displayed < 8, then display front arrow
    // that changes the indexes by factor of 4 (ex: next is 1, 4)
    const [displayedAccessoryRange, setDisplayedAccessoryRange] = useState([0, 4])
    const [userPetPoints, setUserPetPoints] = useState((location.state) ? (location.state.goalArray) : []);
    //const [displayedAccessories, setDisplayedAccessories] = useState(accessories.slice(0,4))
    const user = auth.currentUser;

    //console.log(displayedAccessories[0], displayedAccessories[1]);
    //console.log(accessories[displayedAccessories[0]], accessories[displayedAccessories[1]]);
    console.log(displayedAccessoryRange[1], accessories.length)
    const changeStoreViewFrwd = () => {
        console.log("UPDATE STORE")
        setDisplayedAccessoryRange([displayedAccessoryRange[0] + 4, displayedAccessoryRange[1] + 4]);
        //setDisplayedAccessories(accessories.slice((displayedAccessoryRange[0] + 4), displayedAccessoryRange[1] + 4))
        console.log(displayedAccessoryRange)
    }

    const changeStoreViewBkwd = () => {
        console.log("UPDATE STORE")
        setDisplayedAccessoryRange([displayedAccessoryRange[0] - 4, displayedAccessoryRange[1] - 4]);
        //setDisplayedAccessories(accessories.slice((displayedAccessoryRange[0] - 4), displayedAccessoryRange[1] - 4))
    }

    /*useEffect(() => {
        console.log("change view")
      }, [displayedAccessories]);
    */
    return (
   <div className="PetStore">
    <p className="HeaderBubble">Pet Store</p>
    <div className="Gallery">
        <div className="galleryContents">
        {(accessories.slice(displayedAccessoryRange[0], displayedAccessoryRange[1])).map((itemAndPrice, index) => (
            <div className="AccessoryCard" key={index}>
                <p className="AccessoryName">{itemAndPrice[2]}</p>
                <p className="CardAccessoryText">{itemAndPrice[3]}</p>
                <img src={itemAndPrice[0]} style={{"height":100}} alt="anItem"/>

                <button className="newBubbleButton" id={index}><img src={Key} alt="key"/><span className="priceTag">{itemAndPrice[1]} pts</span></button>
            </div>
        ))}
        </div>
    </div>
    <div className="buttonArea">
        {(displayedAccessoryRange[0] >= 4) ?
        <button className="backArrow" onClick={changeStoreViewBkwd}><img src={backArrow}/></button> 
        :
        <div className="backArrow">

        </div> 
        }
        <p className="petPointsDisplay">{(userPetPoints[userPetPoints.length - 1]).petPoints} pts</p>
        {(displayedAccessoryRange[0] < 8) ?
        <button className="frwdArrow" onClick={changeStoreViewFrwd}><img src={frwdArrow}/></button>
        :
        <div className="frwdArrow">
        
        </div>
        }
    </div>
    <NavBar goalArray={userPetPoints}/>
   </div>
   );
}

export default PetStore;