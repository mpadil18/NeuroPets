import "./Navbar.css"
import { useNavigate } from "react-router-dom"
import { auth} from "../Backend/firebaseSetup.js";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { DeleteGoal } from "../DeleteGoal/DeleteGoal";

function NavBar(props){

    const user = auth.currentUser;

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteGoalOpen, setIsDeleteGoalOpen] = useState(false);

    function SignOutButton(){

        const authUser = auth;

        signOut(authUser).then(() => {

                navigate("../");

        }).catch((error) => {

                console.log(error);

        });
    }

    function setClosed() {

        setIsOpen(false);

    }

    function setOpen(){

        setIsOpen(true);

    }

    function openDeleteGoal () {

        setIsDeleteGoalOpen(true);

    }

    // Pass goalArray to navbar, to emulate caching
    const navToPetGallery = () => {

        navigate("../PetGallery", {state:{goalArray: props.goalArray}});

    }
    
    const navToHome = () => {

        navigate("../Home");

    }
    
    function Logout(){

        return (

        <>
        {isOpen && (

            <div className = "Popup">

                 <div className = "SignOutPopup1">

                     <div className = "SignOutPopup2" >

                                 <p className = "ConfirmSignOutText">Would you like to sign out?</p>
                         
                                <button className = "bubbleButton" onClick = {SignOutButton}>
                                    Okay
                                </button>

                                <button className = "bubbleButton" onClick = {setClosed}>
                                    Cancel
                                </button>
                           
                     </div>

                 </div>

             </div>

        )}
        </>
        );
    }


    return(

    <div className = "Footer">

        <nav className = "navbar">

            <ul className = "navlist">

                <li onClick = {openDeleteGoal} className = "editGoalIcon"/>

                <li className = "petHabitatIcon" onClick={navToPetGallery}/>

                <li className = "homeIcon" onClick={navToHome}/>

                <li className = "shopIcon"/>

                <li className = "settingsIcon" onClick = {setOpen}/>

            </ul>

        </nav>

        <Logout/>

        <DeleteGoal user={user} isDeleteGoalOpen={isDeleteGoalOpen} setIsDeleteGoalOpen={setIsDeleteGoalOpen}/>

    </div>
    
    )
}

export default NavBar; 
