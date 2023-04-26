import "./Login.css"
import React, { useState } from "react"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const login = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);
    }

    return (
        <div className = "Login">
            <img
                src = "./logo.png"
                alt = "NeuroPets logo"
            >
            </img>
            <form className = "login-form" onSubmit = {login}>
                <input value = {username} onChange = {(e) => setUsername(e.target.value)} placeholder="Username" id = "Username" />
                <input value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder="Password" id = "Password" />
                <button>Log In</button>
            </form>
            <button>Need an acccount? Create one here</button>
        </div>
    );
}

export default Login;