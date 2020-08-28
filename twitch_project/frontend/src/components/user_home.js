import React, { useState, useEffect } from 'react';
import { postRequest } from './models';
import Performer from './performer'

function User_home() {

  const token = sessionStorage.getItem("token")
  const [output, setOutput] = useState([]);
  const [mess, setMess] = useState("");

  useEffect(() => {
    getmyperformers();
  }, [])

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
          <button type="button" style={{fontWeight: 'bold', border: '2px solid black'}} class="btn btn-default btn-lg" onClick={synch}>Synch With Twitch!</button>&nbsp;&nbsp;
          <button type="button" style={{fontWeight: 'bold', border: '2px solid black'}} class="btn btn-default btn-lg" onClick={getmyperformers}>Show My Performer Library!</button>
          <br></br>
          <p></p>
          <p style={{color: 'black', fontSize: '30px'}}>{mess}</p>
          <p></p>
          <br></br>
          <div id="performers" style={{display: "flex", flexWrap: "wrap"}}>
            {output.map((perf, index)=> (
              <Performer key={index} perf={perf} />
            ))}
          </div>
          <br></br>
      </div>
  )
}

export default User_home;