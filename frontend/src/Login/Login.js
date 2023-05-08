import "./Login.css"
import React, { useState } from "react"
import logo from "../assets/logo.svg"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase.js"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        //see https://firebase.google.com/docs/auth/web/password-auth for api details
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                const user = userCredential.user;
                //todo: navigate to next page
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/user-not-found') {
                    setErrorMsg("Email not found");
                  } 
            });
    }

    const createAccount = (e) => {
        navigate('../regPage');
    }

    return (
            <div className = "Login">
                <img className = "NPlogo" src = {logo} alt = "NeuroPets Logo"/>
                <div className = "whiteBox">
                    <form className = "login-form" onSubmit = {login}>
                        <input className = "loginField" value = {username} onChange = {(e) => setUsername(e.target.value)} placeholder="Username" id = "Username" required />
                        <input className = "loginField" value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder="Password" id = "Password" required />
                        <button className = "loginButton">Log In</button>
                    </form>
                    {errorMsg && <p> Error: {errorMsg}</p>}
                </div>
                <div className = "createAccountRedirect">
                    <h3>Need an acccount? Create one <button  onClick = {createAccount}className = "createAccountButton">here</button> </h3>
                </div>
            </div>
    );
}

export default Login;
