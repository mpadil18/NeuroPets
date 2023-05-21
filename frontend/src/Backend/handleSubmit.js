import {addDoc, collection} from 'firebase/firestore';
import {firestore, db} from './firebaseSetup';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore'; 

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

// Retrieves all info from all_data pertaining to user
export async function getUserInfo (userid) {
    const docRef = doc(db, "all_data", userid);
    let docSnap = await getDoc(docRef);
    return docSnap.data()
}

// Takes userid and data, updates in the database
export async function updateUserInfo (userid, data) {
    if (userid) {
        // Update the user's goal array by getting old data
        // and pushing the new goal to the list
        const docRef = doc(db, "all_data", userid);
        try {
            await updateDoc(docRef, data);
        } catch (err) {
            console.log(err)
        }       
    }
}

// Creating a data object and intializes goal to null
export async function createUserDb (userid,email) {
    const ref = doc(firestore, "all_data", userid)
    let data = {
        userid: userid,
        useremail: email,
        goalArray:[],
        activeGoal: 0
    }

    try {
        await setDoc(ref, data); // if already existing will update
    } catch (err){
        console.log(err)
    }

}


// Given a user id updates the user progress counter
export async function updateUserProgress(userid , progressCounter){
    if (userid){
        const docRef = doc(db, "all_data", userid);

        await updateDoc(docRef, {
           progressCounter : progressCounter + 1
       });
    }

}

export default handleSubmit