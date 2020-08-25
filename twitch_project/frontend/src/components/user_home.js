import React, { useState, useEffect } from 'react';
import { postRequest } from './models';
import Performer from './performer'

function User_home() {

  const token = sessionStorage.getItem("token")
  const [output, setOutput] = useState([]);
  const [mess, setMess] = useState("");

  const synch = async () => {
    const configs = {
      method: "POST",
      mode: "cors",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({token: token})
    };
    const response = await fetch("http://localhost:5000/api/synch_twitch_performers", configs);
    const data = await response.json();
    if (data["synch"]) {
      setMess("Successfully synch'd accounts")
    } else {
        setMess("Synch failed")
    };
    console.log(data);
  }

  const getmyperformers = async () => {
    const configs = {
      method: "POST",
      mode: "cors",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({token: token})
    };
    const response = await fetch("http://localhost:5000/api/get_my_performers", configs);
    const data = await response.json();
    setOutput(data);
    console.log(data);
  }

  return(
      <div>
          <button onClick={synch}>Synch!</button>
          <button onClick={getmyperformers}>Show My Performer Library!</button>
          <p></p>
          <p style={{fontSize: '20px'}}>{mess}</p>
          <p></p>
          <div id="performers" style={{columnCount: "3"}}>
            {output.map((perf, index)=> (
              <Performer key={index} perf={perf} />
            ))}
          </div>
      </div>
  )
}

export default User_home;