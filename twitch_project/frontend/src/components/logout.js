import React, { useState, useEffect } from 'react';
// import { postRequest, getRequest } from './models'

export default function Logout({setToken}) {

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    const logout = async () => {
      const configs = {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({token: token})
      };
      const response = await fetch("http://localhost:5000/api/logout", configs);
      const data = await response.json();
      setToken("")
      console.log(data);
    }
    logout();
  }, [])

    return(
        <div>
            <p>Logged out successfully.</p>
        </div>
    )
    }