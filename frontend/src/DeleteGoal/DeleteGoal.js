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
                    let goals = docSnap.data().goal;
                    let currGoal = goals[goals.length - 1];
            
                    await updateDoc(docRef, {
                        "goal": firebase.firestore.FieldValue.arrayRemove(currGoal)
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
                    <div className = "InputBubble">
                        <div className = "bubbleHeader">
                            <p>Would you like to delete your current goal and create a new one?</p>
                            <p>This action will delete your current progress!</p>
                        </div>
                        <div className = "deleteGoalButtons">
                            <button onClick = {deleteCurrentGoal} className = "deleteGoalButton"> Yes </button>
                            <button onClick = {closeDeleteGoal} className = "deleteGoalButton"> No </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export {DeleteGoal};