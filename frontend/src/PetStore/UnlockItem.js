import "./PetStore.css"
import { getDoc, updateDoc, doc} from "firebase/firestore"; 
import { db } from "../Backend/firebaseSetup.js";

function UnlockItem (props) {
    let user = props.user;
    let unlockItemPopup = props.unlockItemPopup;

    // retrieve all the data involving the item
    let itemData = props.itemData;
    let itemImg = itemData[0];
    let itemPrice = itemData[1];
    let itemName = itemData[2];
    let itemIndex = itemData[4];

    const unlockItem = async () => { 
        const docRef = doc(db, 'all_data', user.uid);
        const docSnap = await getDoc(docRef);

        // decrement the user's pet points
        let userPoints = props.userPetPoints;
        let newUserPoints = userPoints - itemPrice;

        // retrieve the unlocked accessories array from the database
        let accessories = docSnap.data().unlockedAccessories;

        // set the item as unlocked
        accessories[itemIndex] = true;

        // update the database with the new pet point value and updated unlocked accessories array
        await updateDoc(docRef, {
            "unlockedAccessories": accessories,
            "petPoints": newUserPoints
        });

        // set the isUnlocked state with the updated accessories array
        props.setIsUnlocked(accessories);

        // Update the user points for the pet store frontend
        props.setUserPetPoints(newUserPoints);

        // close the popup
        props.setUnlockItemPopup(false);
    }

    const closeUnlockItemPopup = () => {
        // close the popup
        props.setUnlockItemPopup(false);
    }
    
   
    return (
        <>
        {unlockItemPopup && (
            <div className="Popup">
                <div className="UnlockItem">
                    <div className="InputBubble">
                        <p className="UnlockItemText">Are you sure you want to unlock the <span className="BoldedItemData">{itemName}</span> for <span className="BoldedItemData">{itemPrice}</span> points?</p>
                        <img src={itemImg} style={{"height":100}} alt="anItem"/>
                        <div className="BinaryBubbleButtons">
                            <button onClick={unlockItem} className="BinaryBubbleButton"> Yes </button>
                            <button onClick={closeUnlockItemPopup} className="BinaryBubbleButton"> No </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default UnlockItem