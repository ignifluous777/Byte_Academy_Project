import React, { useState } from 'react';
import { postRequest, getRequest } from './models'

export default function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    function signIn(em, pw) {
        // request to login
    }

    return(
        <div>
            <input id="email" onChange={e => setEmail(e.target.value)} placeholder="User Name"/>
            <input id="password" onChange={e => setPassword(e.target.value)} placeholder="Password"/>
            <button onClick={e => signIn(email, password)}>Log In</button>
        </div>
    )
}