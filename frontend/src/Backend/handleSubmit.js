import {addDoc, collection} from 'firebase/firestore';
import {firestore, db} from './firebaseSetup';
import { doc, setDoc, updateDoc } from 'firebase/firestore'; 

const handleSubmit = (testdata) => {
    const ref = collection(firestore,"goals")
    let data = {
        user_goal : testdata
    }
    try {
        addDoc(ref, data)
    } catch (err){
        console.log(err)
    }

}

// Creating a data object and intializes goal to null
export async function createUserDb (userid,email) {
    const ref = doc(firestore, "all_data", userid)
    let data = {
        userid: userid,
        useremail: email,
        goal: "No goal set" 
    }

    try {
        await setDoc(ref, data); // if already existing will update
    } catch (err){
        console.log(err)
    }

}

// Creating a data object and intializes goal to null
export async function setUserGoal (userid,goaltext) {
    const docRef = doc(db, "all_data", userid)
    
    try {
        await updateDoc( docRef, {
            goal: goaltext
        }); 
    } catch (err){
        console.log(err)
    }

}

export default handleSubmit