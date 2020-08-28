import React, { useState } from 'react';
// import { postRequest, getRequest } from './models'

export default function Login({setToken}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failmess, setFailmess] = useState("");


    const login = async () => {
        const configs = {
          method: "POST",
          mode: "cors",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({email: email, password: password})
        };
        const response = await fetch("http://localhost:5000/api/login", configs);
        const data = await response.json();
        if (data["token"]) {
          setToken(data["token"])
          } else {
            setFailmess("Login Error")
          };
          console.log(data);
      }
    return(
        <div>
          <br></br>
          <br></br>
          <input type="text" style={{fontWeight: 'bold', border: '2px solid black'}} class="input-lg" id="usr" onChange={e => setEmail(e.target.value)} placeholder="User Name"/>&nbsp;&nbsp;
          <input type="password" style={{fontWeight: 'bold', border: '2px solid black'}} class="input-lg" id="pwd" onChange={e => setPassword(e.target.value)} placeholder="Password"/>
          <br></br>
          <br></br>
          <button type="button" style={{fontWeight: 'bold', border: '2px solid black'}} class="btn btn-default btn-lg" onClick={login}>Log In</button>
          <p style={{color: 'white', fontSize: '30px'}}>{failmess}</p>
        </div>
    )
}