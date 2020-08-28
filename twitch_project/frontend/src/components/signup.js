import React, { useState } from 'react';
// import { postRequest } from './models'

export default function Signup() {

    const [email, setEmail] = useState("");
    const [twitchUn, setTwitchUn] = useState("");
    const [password, setPassword] = useState("");
    const [confPass, setConfpass] = useState("");
    const [mess, setMess] = useState("");


    const signup = async () => {
        if (password !== confPass) {
            setMess("Error: Passwords do not match")
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
        if (data["create"]) {
            setMess("Account Created Successfully. Please Return to Login")
        } else {
            setMess("Account with that email and/or twitch username already exists")
        };
        console.log(data);
        };

    return(
        <div>
            <br></br>
            <br></br>
            <input type="text" style={{fontWeight: 'bold', border: '2px solid black'}} class="input-lg" id="usr" onChange={e => setEmail(e.target.value)} placeholder="User Name"/>
            <br></br>
            <br></br>
            <input type="password" style={{fontWeight: 'bold', border: '2px solid black'}} class="input-lg" id="pwd" onChange={e => setPassword(e.target.value)} placeholder="Password"/>
            <br></br>
            <br></br>
            <input type="password" style={{fontWeight: 'bold', border: '2px solid black'}} class="input-lg" id="pwd" onChange={e => setConfpass(e.target.value)} placeholder="Confirm Password"/>
            <br></br>
            <br></br>
            <input type="text" style={{fontWeight: 'bold', border: '2px solid black'}} class="input-lg" id="usr" onChange={e => setTwitchUn(e.target.value)} placeholder="Twitch Username"/>
            <br></br>
            <br></br>
            <button type="button" style={{fontWeight: 'bold', border: '2px solid black'}} class="btn btn-default btn-lg" onClick={signup}>Create Account</button>
            <br></br>
            <p style={{color: 'white', fontSize: '30px'}}>{mess}</p>
        </div>
    )
}