import React, { useState } from 'react';
// import { postRequest } from './models'

export default function Signup() {

    const [email, setEmail] = useState("");
    const [twitchUn, setTwitchUn] = useState("");
    const [password, setPassword] = useState("");
    const [confPass, setConfpass] = useState("");


    const login = async () => {
        if (password !== confPass) {
            return (console.log("Error: Passwords do not match"))
        };
        const configs = {
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: email, twitch_un: twitchUn, password: password})
        };
        const response = await fetch("http://localhost:5000/api/create_account", configs);
        const data = await response.json();
        console.log(data);
        };

    return(
        <div>
            <input id="email" onChange={e => setEmail(e.target.value)} placeholder="User Name"/>
            <input id="password" onChange={e => setPassword(e.target.value)} placeholder="Password"/>
            <input id="confirm_password" onChange={e => setConfpass(e.target.value)} placeholder="Confirm Password"/>
            <input id="twitch_un" onChange={e => setTwitchUn(e.target.value)} placeholder="Twitch Username"/>
            <button onClick={login}>Create Account</button>
        </div>
    )
}