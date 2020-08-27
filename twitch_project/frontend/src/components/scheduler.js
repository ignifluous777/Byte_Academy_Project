import React, { useState, useEffect } from 'react';
import { postRequest } from './models';

function Scheduler() {

  const token = sessionStorage.getItem("token")
  const [mess, setMess] = useState("");

  const [date, setDate] = useState("");

  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [time3, setTime3] = useState("");
  const [time4, setTime4] = useState("");
  const [time5, setTime5] = useState("");
  const [time6, setTime6] = useState("");
  const [time7, setTime7] = useState("");
  const [time8, setTime8] = useState("");

  const [perf1, setPerf1] = useState("");
  const [perf2, setPerf2] = useState("");
  const [perf3, setPerf3] = useState("");
  const [perf4, setPerf4] = useState("");
  const [perf5, setPerf5] = useState("");
  const [perf6, setPerf6] = useState("");
  const [perf7, setPerf7] = useState("");
  const [perf8, setPerf8] = useState("");

  const divStyle = {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%', 
    padding: '80px 1em 0 1em',
    borderStyle: 'outset',
  }

  const schedule = async () => {
    
    const timeSlots = [time1, time2, time3, time4, time5, time6, time7, time8]
    const performers = [perf1, perf2, perf3, perf4, perf5, perf6, perf7, perf8]

    const configs = {
      method: "POST",
      mode: "cors",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({token: token, date: date, timeSlots: timeSlots, performers: performers})
    };
    const response = await fetch("http://localhost:5000/api/schedule", configs);
    const data = await response.json();
    if (data["create"]) {
      setMess("Schedule Created Successfully. Link for schedule is: http://localhost:5000/api/showsked  Enter this schedule ID to view it: " + data["sk_id"])
    } else {
      setMess("Error creating schedule.")
    };
    console.log(data);
  }

  return (
    <div style={divStyle}>
        <div style={{float: 'center'}}>
          <input type="date" id="datepicker" style={{width: "300px", height: "50px"}} onChange={e => setDate(e.target.value)}/>
          <br></br>
          <br></br><input type="time" style={{width: "150px", height: "50px"}} onChange={e => setTime1(e.target.value)}/><input type="text" style={{width: "400px", height: "50px"}} onChange={e => setPerf1(e.target.value)} placeholder="Performer's Twitch User Name"/>
          <br></br>
          <br></br><input type="time" style={{width: "150px", height: "50px"}} onChange={e => setTime2(e.target.value)}/><input type="text" style={{width: "400px", height: "50px"}} onChange={e => setPerf2(e.target.value)} placeholder="Performer's Twitch User Name"/>
          <br></br>
          <br></br><input type="time" style={{width: "150px", height: "50px"}} onChange={e => setTime3(e.target.value)}/><input type="text" style={{width: "400px", height: "50px"}} onChange={e => setPerf3(e.target.value)} placeholder="Performer's Twitch User Name"/>
          <br></br>
          <br></br><input type="time" style={{width: "150px", height: "50px"}} onChange={e => setTime4(e.target.value)}/><input type="text" style={{width: "400px", height: "50px"}} onChange={e => setPerf4(e.target.value)} placeholder="Performer's Twitch User Name"/>
          <br></br>
          <br></br><input type="time" style={{width: "150px", height: "50px"}} onChange={e => setTime5(e.target.value)}/><input type="text" style={{width: "400px", height: "50px"}} onChange={e => setPerf5(e.target.value)} placeholder="Performer's Twitch User Name"/>
          <br></br>
          <br></br><input type="time" style={{width: "150px", height: "50px"}} onChange={e => setTime6(e.target.value)}/><input type="text" style={{width: "400px", height: "50px"}} onChange={e => setPerf6(e.target.value)} placeholder="Performer's Twitch User Name"/>
          <br></br>
          <br></br><input type="time" style={{width: "150px", height: "50px"}} onChange={e => setTime7(e.target.value)}/><input type="text" style={{width: "400px", height: "50px"}} onChange={e => setPerf7(e.target.value)} placeholder="Performer's Twitch User Name"/>
          <br></br>
          <br></br><input type="time" style={{width: "150px", height: "50px"}} onChange={e => setTime8(e.target.value)}/><input type="text" style={{width: "400px", height: "50px"}} onChange={e => setPerf8(e.target.value)} placeholder="Performer's Twitch User Name"/>
          <br></br>
        </div>
        <br></br>
        <button type="button" class="btn btn-default btn-lg" onClick={schedule}>Schedule!</button>
        <br></br>
        <p style={{color: 'white', fontSize: '40px'}}>{mess}</p>
        <br></br>
    </div>
  );

}

export default Scheduler;