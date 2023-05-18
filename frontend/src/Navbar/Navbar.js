import "./Navbar.css"
import { useNavigate } from "react-router-dom"
import { auth} from "../Backend/firebaseSetup.js";
import { signOut } from "firebase/auth";
import { useState } from "react";

function NavBar(){
    
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

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
                <li className = "editGoalIcon"/>
                <li className = "petHabitatIcon"/>
                <li className = "homeIcon"/>
                <li className = "shopIcon"/>
                <li className = "settingsIcon" onClick = {setOpen}/>
            </ul>
        </nav>
        <Logout/>
    </>
    )
}

export default NavBar; 