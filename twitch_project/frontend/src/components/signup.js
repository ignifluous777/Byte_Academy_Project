import React, { useState } from 'react';
import { postRequest } from './models'

export default function Signup() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confPass, setConfpass] = useState("");

    const [twitchUn, setTwitchUn] = useState("");

    function CreateAccount(un, pass, pass2, twUN) {
        // add new account info
        if (pass !== pass2) {
            return (console.log("Error: Passwords do not match"))
        }
        // send data to db through accounts.
    }

    return(
        <div>
            <input id="email" onChange={e => setEmail(e.target.value)} placeholder="User Name"/>
            <input id="password" onChange={e => setPassword(e.target.value)} placeholder="Password"/>
            <input id="confirm_password" onChange={e => setConfpass(e.target.value)} placeholder="Confirm Password"/>
            <input id="twitch_un" onChange={e => setTwitchUn(e.target.value)} placeholder="Twitch Username"/>
            <button onClick={e => CreateAccount(email, password, confPass, twitchUn)}>Create Account</button>
        </div>
    )
}