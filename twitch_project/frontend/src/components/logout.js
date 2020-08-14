import React, { useState } from 'react';
import { postRequest, getRequest } from './models'

export default function Logout() {

    const logout = async () => {
        const configs = {
          method: "POST",
          mode: "cors",
          headers: {"Content-Type": "application/json"},
        //   body: JSON.stringify({email: email, password: password})
        };
        const response = await fetch("http://localhost:5000/api/logout", configs);
        const data = await response.json();
        console.log(data);
      }

    return(
        <div>
            <button onClick={logout}>Log Out</button>
        </div>
    )
    }