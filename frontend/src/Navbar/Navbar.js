import "./Navbar.css"
import { useNavigate } from "react-router-dom"
import { auth} from "../Backend/firebaseSetup.js";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { DeleteGoal } from "../DeleteGoal/DeleteGoal";

function NavBar(){
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

    const navToPetGallery = () => {
        navigate("../PetGallery");
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
                             <button className = "ConfirmSignOutButton" onClick = {SignOutButton}>
                                 <p className = "OkayText">Okay</p>
                             </button>
                             <button className = "CancelSignOutButton" onClick = {setClosed}>
                                 <p className = "CancelText">Cancel</p>
                             </button>
                     </div>
                 </div>
             </div>
        )}
        </>
        );
    }


    return(
    <>
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
    </>
    )
}

export default NavBar; 
