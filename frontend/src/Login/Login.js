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
                <form className = "loginForm" onSubmit = {login}>
                    <input className = "loginField" value = {username} onChange = {(e) => setUsername(e.target.value)} placeholder="Username" id = "Username" required />
                    <input className = "loginField" value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder="Password" id = "Password" required />
                    <button className = "loginButton">Log In</button>
                </form>
                <button>Need an acccount? Create one here</button>
        </div>
    );
}

export default Login;