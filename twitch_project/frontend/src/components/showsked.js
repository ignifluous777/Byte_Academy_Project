import React, { useState, useEffect } from 'react';
import { postRequest } from './models';
import Performer from './performer'

function Show_sked() {

  const [sk_id, setSkid] = useState("");
//   testing output before sorting and formatting:
  const [output, setOutput] = useState("")
//   final should be something like this:
//   const [date, setDate] = useState("");
//   const [times, setTimes] = useState("");
//   const [performers, setPerformers] = useState("");


  const showSked = async () => {
    const configs = {
      method: "POST",
      mode: "cors",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({sk_id: sk_id})
    };
    // need to figure out how to make this automatic
    // const response = await fetch(`http://localhost:5000/api/showsked/${sk_id}`, configs);
    const response = await fetch("http://localhost:5000/api/showsked", configs);
    const data = await response.json();
    setOutput(data)
    // setDate(data[] )
    // setTimes(data[] )
    // setPerfomers(data[] )
    console.log(data);
  }

  return(
      <div>
          <input onChange={e => setSkid(e.target.value)} placeholder="Schedule ID key"/>
          <button onClick={showSked}>Show Schedule!</button>
          <p>{output}</p>
      </div>
  )
}

export default Show_sked;