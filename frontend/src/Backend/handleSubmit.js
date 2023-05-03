import {addDoc, collection} from 'firebase/firestore';
import {firestore} from './firebaseSetup';


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

export default handleSubmit