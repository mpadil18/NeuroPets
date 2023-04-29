import "./Login.css"
import logo from "../assets/logo.png"
import tag from "../assets/neuropets-tag.png"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase.js"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                const user = userCredential.user;
                //todo: navigate to next page
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.errorMessage;
                console.log(errorCode, errorMessage);
            });
    }

    const createAccount = (e) => {
        navigate('../Registration/RegPage');
    }

    return (
            <div className = "Login">
                <img src = {logo} alt = "NeuroPets logo" />
                <img src =  {tag} alt = "NeuroPets Tag" />
                <div className = "whiteBox">
                    <form className = "login-form" onSubmit = {login}>
                        <input className = "loginField" value = {username} onChange = {(e) => setUsername(e.target.value)} placeholder="Username" id = "Username" required />
                        <input className = "loginField" value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder="Password" id = "Password" required />
                        <button className = "loginButton">Log In</button>
                    </form>
                </div>
                <div className = "createAccountRedirect">
                    <h3>Need an acccount? Create one <button onClick = {createAccount} className = "createAccountButton">here</button> </h3>
                </div>
            </div>
    );
}

export default Login;