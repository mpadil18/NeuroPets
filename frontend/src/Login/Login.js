import "./Login.css"
import logo from "../assets/logo.png"
import tag from "../assets/neuropets-tag.png"
import React, { useState } from "react"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);
    }

    const createAccount = (e) => {
        console.log("redirect to account creation");
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