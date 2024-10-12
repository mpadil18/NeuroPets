import "./PetStore.css"
import NavBar from "../Navbar/Navbar";
import UnlockItem from "./UnlockItem";

import DressUp from "./DressUp.js"
import NavigationArrows from "./NavigationArrows"
import { auth } from "../Backend/firebaseSetup.js";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"
import { getDoc, doc} from "firebase/firestore"; 
import { db } from "../Backend/firebaseSetup.js";

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
import Shirt from "../assets/elements/Shirt.png"

function PetStore() {
    const location = useLocation();
    const [petArray] = useState((location.state) ? location.state.goalArray : []);

    //We map the type of accessory to the appropriate ranges provided in the pet store
    // (Ex: all elements from indexes 0-6 are headgear, all from indexes 7-8 are neckwear)
    // Each pair is the accessory with the price
    // last number serves as an index associating the item with its index in the database
    const accessories = [[capBlue, 25, "Blue Cap", "Your pet will feel fly in this!", 0], 
    [capOrange, 25, "Orange Cap", "Your pet will feel fly in this!", 1], 
    [capRed, 25, "Red Cap", "Your pet will feel fly in this!", 2], 
    [cowboyhat, 50, "Cowboy Hat", "Your pet will feel fly in this!", 3], 
    [partyhatBlue, 35, "Blue Party Hat", "Your pet will feel fly in this!", 4], 
    [partyhatGreen, 35, "Green Party Hat", "Your pet will feel fly in this!", 5], 
    [partyhatPink, 35, "Pink Party Hat", "Your pet will feel fly in this!", 6], 
    [bandanaBlue, 20, "Blue Bandana", "Your pet will feel fly in this!", 7], 
    [bandanaRed, 20, "Red Bandana", "Your pet will feel fly in this!", 8]]

    /* displayedAccessoryRange: the items from accessories to currently display (changed with Navigation Arrows)
    Last accessory = item 9.
    If the last item of displayed < 8, then display front arrow
    that changes the indexes by factor of 4 (ex: next is 1, 4) */
    const [displayedAccessoryRange, setDisplayedAccessoryRange] = useState([0, 4])

    /* VARIABLES:
        userPetPoints: the user's pet points available (updated after purchasing an item)
        selectedAccessory: the selected item from the list of accessories
        popupDisplay: on true, displays the dressup menu.
        unlockItemPopup: on true, displays the popup asking user if they want to spend their points
        itemData: used to access information about accessory in `UnlockItem.js`
        isUnlocked: the array of data indicating whether the user has an item unlocked or not. This affects which buttons are rendered */
    const [userPetPoints, setUserPetPoints] = useState(location.state.petPoints);
    const [selectedAccessory, setSelectedAccessory] = useState(0);
    const [popupDisplay, setPopupDisplay] = useState(false);
    const [unlockItemPopup, setUnlockItemPopup] = useState(false);
    const [itemData, setItemData] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState([]);
    const user = auth.currentUser;

    const changeStoreViewFrwd = () => {
        setDisplayedAccessoryRange([displayedAccessoryRange[0] + 4, 
                                    displayedAccessoryRange[1] + 4]);
    }

    const changeStoreViewBkwd = () => {
        setDisplayedAccessoryRange([displayedAccessoryRange[0] - 4, 
                                    displayedAccessoryRange[1] - 4]);
    }

    const openUnlockItem = (item) => {
        // only open the unlock item popup if the user has enough pets points to purchase the item
        let pointsToUnlock = item[1];
        let userPoints = userPetPoints;

        if (userPoints >= pointsToUnlock){

            setItemData(item);
            setUnlockItemPopup(true);

        }

    }

    useEffect(() => {

        const getAccessoriesArray = async () => {

            const docRef = doc(db, 'all_data', user.uid);
            const docSnap = await getDoc(docRef);

            let accessories = docSnap.data().unlockedAccessories;
            setIsUnlocked(accessories);

        }

        getAccessoriesArray();

    }, [user.uid]);

    //Sets the selectedAccessory by accessing the accessories array,
    //and reveals the dressup popup
    const dressUpPet = (accessoryId) => {

        setSelectedAccessory(accessories[Number(accessoryId)]);
        setPopupDisplay(true);

    }

    return (

   <div className="CardDisplay">

        <p className="HeaderBubble">Pet Store</p>

    <div className="Gallery">

        <div className="galleryContents">

        {(accessories.slice(displayedAccessoryRange[0],
                            displayedAccessoryRange[1])).map((itemAndPrice, index) => (

            <div className="ItemStoreCard" key={index + displayedAccessoryRange[0]}>

                <p className="ItemName">{itemAndPrice[2]}</p>

                <p className="ItemTextDesc">{itemAndPrice[3]}</p>

                <img src={itemAndPrice[0]} style={{"height":100}} alt="anItem"/>

                {/* This dressUpPet function should be called on the dress up button instead, but it's being tested as a plain button for now */}
            
                {isUnlocked[itemAndPrice[4]] &&
                    <button className="newBubbleButton" 

                        id={Number(index + displayedAccessoryRange[0])} 
                        
                        onClick={(e) => dressUpPet(e.target.id)}>
                            
                            <img src={Shirt} id={Number(index + displayedAccessoryRange[0])} 
                            alt ="acc"/>
                            
                            Dress a pet

                    </button>

                }

                {!isUnlocked[itemAndPrice[4]] &&
                    ((itemAndPrice[1] <= userPetPoints) ? 

                        <button onClick = {() => openUnlockItem(itemAndPrice)} className="newBubbleButton"
                        
                        id={index}><img src={Key} alt="key"/>
                        
                            <span className="priceTag">
                                
                                {itemAndPrice[1]} pts
                                
                            </span>

                        </button>
                        : 
                        <button className="disabledBubbleButton" 
                        
                        id={index}><img src={Key} alt="key"/>
                        
                            <span className="priceTag">
                                
                                {itemAndPrice[1]} pts
                                
                            </span>
                        
                        </button>)

                }

                <UnlockItem unlockItemPopup={unlockItemPopup} 
                
                            setUnlockItemPopup={setUnlockItemPopup}

                            setIsUnlocked={setIsUnlocked} itemData={itemData} 

                            user={user} userPetPoints={userPetPoints} 

                            setUserPetPoints={setUserPetPoints}
                />
                
            </div>

        ))}

        </div>

    </div>

    <NavigationArrows 

        displayedRange={displayedAccessoryRange} 

        backLimit={4} frwdLimit={9} 
        
        backFunc={changeStoreViewBkwd}

        frwdFunc={changeStoreViewFrwd}

        middleComponent={<p className="petPointsDisplay">
            {(userPetPoints)} pts</p>}/>

    {popupDisplay && <DressUp goalArray={petArray} selectedAccessory={selectedAccessory}
                      popupDisplay={popupDisplay} setPopupDisplay={setPopupDisplay}/>}

    <NavBar goalArray={petArray} petPoints={userPetPoints}/>

   </div>

   );

}

export default PetStore;