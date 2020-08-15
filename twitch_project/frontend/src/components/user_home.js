import React, { useState, useEffect } from 'react';
import { postRequest } from './models';

function User_home() {

  const synch = async () => {
    const configs = {
      method: "POST",
      mode: "cors",
      headers: {"Content-Type": "application/json"},
      // body: JSON.stringify({email: email, password: password})
    };
    const response = await fetch("http://localhost:5000/api/synch_twitch_performers", configs);
    const data = await response.json();
    console.log(data);
  }
return(
    <div>
        <button onClick={synch}>Synch</button>
    </div>
)
}

export default User_home;