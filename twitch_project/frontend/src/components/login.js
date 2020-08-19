import React, { useState } from 'react';
// import { postRequest, getRequest } from './models'

export default function Login({setToken}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const login = async () => {
        const configs = {
          method: "POST",
          mode: "cors",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({email: email, password: password})
        };
        const response = await fetch("http://localhost:5000/api/login", configs);
        const data = await response.json();
        setToken(data["token"])
        console.log(data);
      }
    return(
        <div>
            <input id="email" onChange={e => setEmail(e.target.value)} placeholder="User Name"/>
            <input id="password" onChange={e => setPassword(e.target.value)} placeholder="Password"/>
            <button onClick={login}>Log In</button>
        </div>
    )
}