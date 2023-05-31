import "./DeleteGoal.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { getDoc, updateDoc, doc} from "firebase/firestore"; 
import { db } from "../Backend/firebaseSetup.js";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';

function DeleteGoal(props) {
    let user = props.user;
    let isDeleteGoalOpen = props.isDeleteGoalOpen;
    const [activeGoal, setActiveGoalExists] = useState(true);

    const navigate = useNavigate();

    // user should not be able to delete a goal if they have no active goals
    // so display different text if there are no active goals
    const getActiveGoal = async () => {
        const docRef = doc(db, "all_data", user.uid);
        let docSnap = await getDoc(docRef);
        setActiveGoalExists(!!(docSnap.data().activeGoal));
    }
    getActiveGoal();

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
                    // deletes the current goal, deletes last progress made, and sets activeGoal as false
                    await updateDoc(docRef, {
                        "goalArray": firebase.firestore.FieldValue.arrayRemove(currGoal),
                        "lastProgressMade" : firebase.firestore.FieldValue.delete(timeStamp),
                        "activeGoal": 0
                    });
                }
            }
        getAllData();
        navigate('../CreateGoal');
    }

    return (
        <>
        {isDeleteGoalOpen && (
            <div className = "Popup">
                <div className = "DeleteGoal">
                    <div className = "DeleteGoalInputBubble">
                        {activeGoal &&
                        <div className = "ActiveGoalExists">
                            <div className = "bubbleHeader">
                                <p>Would you like to delete your current goal and create a new one?</p>
                                <p>This action will delete your current progress!</p>
                            </div>
                            <div className = "deleteGoalButtons">
                                <button onClick = {deleteCurrentGoal} className = "deleteGoalButton"> Yes </button>
                                <button onClick = {closeDeleteGoal} className = "deleteGoalButton"> No </button>
                            </div>
                        </div>
                        }
                        {!activeGoal &&
                        <div className = "NoActiveGoalExists">
                                <div className = "bubbleHeader">
                                    <p>You have no active goals so you can't delete any goals!</p>
                                    <div className = "deleteGoalButtons">
                                    <button onClick = {closeDeleteGoal} className = "deleteGoalButton"> Ok </button>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export {DeleteGoal};