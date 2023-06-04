import "./DeleteGoal.css"
import { useNavigate } from "react-router-dom"
import { getDoc, updateDoc, doc} from "firebase/firestore"; 
import { db } from "../Backend/firebaseSetup.js";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';

function DeleteGoal(props) {
    let user = props.user;
    let isDeleteGoalOpen = props.isDeleteGoalOpen;

    const navigate = useNavigate();

    const closeDeleteGoal = (e) => {
        props.setIsDeleteGoalOpen(false);
    }

    const deleteCurrentGoal = (e) => {
            const getAllData = async () => {
                if (user) { 
                    const docRef = doc(db, 'all_data', user.uid);
                    const docSnap = await getDoc(docRef);
                    let goalArray = docSnap.data().goalArray;
                    let currGoal = goalArray[goalArray.length - 1];
                    let timeStamp = docSnap.data().lastProgressMade;
                    await updateDoc(docRef, {
                        "goalArray": firebase.firestore.FieldValue.arrayRemove(currGoal),
                        "lastProgressMade" : firebase.firestore.FieldValue.delete(timeStamp)
                    });
                }
            }
        getAllData();
        navigate('../CreateGoal');
    }

    return (
        <>
        {isDeleteGoalOpen && (
            <div className = "DeleteGoalPopup">
                <div className = "DeleteGoal">
                    <div className = "InputBubble">
                        <div className = "bubbleHeader">
                            <p>Would you like to delete your current goal and create a new one?</p>
                            <p>This action will delete your current progress!</p>
                        </div>
                        <div className = "BinaryBubbleButtons">
                            <button onClick = {deleteCurrentGoal} className = "BinaryBubbleButton"> Yes </button>
                            <button onClick = {closeDeleteGoal} className = "BinaryBubbleButton"> No </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export {DeleteGoal};