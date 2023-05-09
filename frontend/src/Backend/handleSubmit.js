import {addDoc, collection} from 'firebase/firestore';
import {firestore} from './firebaseSetup';
import { doc, setDoc } from 'firebase/firestore'; 

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
    //const ref = collection(firestore,"all_data")
    let data = {
        userid: userid,
        useremail: email,
        goal: []
    }

    try {
       // await setDoc(doc(db, "data", "one"), docData);
        //addDoc(ref, data, userid)
        await setDoc(doc(firestore, "all_data", userid), data); // if already existing will update
    } catch (err){
        console.log(err)
    }

}

export default handleSubmit