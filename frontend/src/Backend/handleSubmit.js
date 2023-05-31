import {addDoc, collection} from 'firebase/firestore';
import {firestore, db} from './firebaseSetup';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore'; 


// Retrieves all info from all_data pertaining to user
export async function getUserInfo (userid) {
    const docRef = doc(db, "all_data", userid);
    try {
        let docSnap = await getDoc(docRef);
        return docSnap.data()
    } catch (err) {
        console.log("Error on getUserInfo: ", err);
    }
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
export async function createUserDb (userid, email) {
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



//Given a userid appends to the goalArray
export async function createNewGoal(userid, goalText, petName){

    const babyPetCodes = [0, 3, 6];
    
    const assignRandomPet = () => {
    return babyPetCodes[Math.floor(Math.random()*babyPetCodes.length)];
    }

    const pet = assignRandomPet();
    const startDate = new Date();
    const goalTuple = {goal: goalText, pet: pet, petName: petName,
                       currDate: startDate, progressCounter: 0, 
                       petPoints: 0, logs:[]};

      // Update the user's goal array by getting old data
      // and pushing the new goal to the list
    try {
        let docSnap = await getUserInfo(userid);
        let tempArr = docSnap.goalArray;
        tempArr.push(goalTuple);
        updateUserInfo(userid, {goalArray: tempArr});    
    } catch (err){
        console.log(err)
    }
}
