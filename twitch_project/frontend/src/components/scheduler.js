import React, { useState, useEffect } from 'react';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import TextField from '@material-ui/core/TextField';
// import { postRequest } from './models';
// import { withRouter } from 'react-router-dom';

function Scheduler() {

  const token = sessionStorage.getItem("token")
  const [mess, setMess] = useState("");
  // const [mess2, setMess2] = useState("");
  const [mess3, setMess3] = useState("");
  const [mess4, setMess4] = useState("");

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
    // boxSizing: 'border-box',
    // width: '100%',
    // height: '100%', 
    // padding: '80px 1em 0 1em',
    // borderStyle: 'outset'
    margin: '10px',
    backgroundColor: '#ffe8fd',
    border: '1px solid black',
    opacity: '0.8' 
  }
  const timeStyle = {
    width: "150px", 
    height: "50px",
    color: "black",
    fontWeight: 'bold', 
    border: '2px solid black',
  }
  const perfStyle = {
    width: "400px", 
    height: "50px",
    color: "black",
    fontWeight: 'bold', 
    border: '2px solid black'
  }
  const checkSked = {
    fontSize: '25px', 
    color: '#f00a79', 
    fontWeight: 'bold', 
    textShadow: '2px 2px 4px #960b4e'
  }
  const messFont = {
    fontSize: '25px', 
    color: 'black', 
    fontWeight: 'bold', 
    textShadow: '2px 2px 4px #960b4e'
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
      setMess("Schedule Created Successfully!")
      // setMess2("Logged in link: http://localhost:3000/showsked/" + data["sk_id"])
      setMess3("http://localhost:3000/skedwithid/" + data["sk_id"])
      setMess4("You may also view the schedule manually on the schedule page with this code:  " + data["sk_id"])
    } else {
      setMess("Error creating schedule.")
    };
    console.log(data);
  }

  return (
    <div style={divStyle}>
        <div style={{float: 'center'}}>
          <h2 style={{fontSize: '50px', color: '#f00a79', fontWeight: 'bold', textShadow: '2px 2px 4px #960b4e',}}>Scheduler</h2>
          <h4 style={{fontSize: '30px', color: '#f00a79', fontWeight: 'bold', textShadow: '2px 2px 4px #960b4e',}}>Create Your Own "Digital Music Festival"</h4>
          <br></br>
          <input type="date" id="datepicker" style={{color: 'black', width: "300px", height: "50px", border: '2px solid black'}} onChange={e => setDate(e.target.value)}/>
          <br></br>
          <br></br><input type="time" style={timeStyle} onChange={e => setTime1(e.target.value)}/>&nbsp;<input type="text" style={perfStyle} onChange={e => setPerf1(e.target.value)} placeholder="Performer's Twitch User Name"/>&nbsp;<a style={checkSked} href={"https://www.twitch.tv/" + perf1 + "/schedule"} target="_blank" >Check Schedule on Twitch</a>
          <br></br>
          <br></br><input type="time" style={timeStyle} onChange={e => setTime2(e.target.value)}/>&nbsp;<input type="text" style={perfStyle} onChange={e => setPerf2(e.target.value)} placeholder="Performer's Twitch User Name"/>&nbsp;<a style={checkSked} href={"https://www.twitch.tv/" + perf2 + "/schedule"} target="_blank" >Check Schedule on Twitch</a>
          <br></br>
          <br></br><input type="time" style={timeStyle} onChange={e => setTime3(e.target.value)}/>&nbsp;<input type="text" style={perfStyle} onChange={e => setPerf3(e.target.value)} placeholder="Performer's Twitch User Name"/>&nbsp;<a style={checkSked} href={"https://www.twitch.tv/" + perf3 + "/schedule"} target="_blank" >Check Schedule on Twitch</a>
          <br></br>
          <br></br><input type="time" style={timeStyle} onChange={e => setTime4(e.target.value)}/>&nbsp;<input type="text" style={perfStyle} onChange={e => setPerf4(e.target.value)} placeholder="Performer's Twitch User Name"/>&nbsp;<a style={checkSked} href={"https://www.twitch.tv/" + perf4 + "/schedule"} target="_blank" >Check Schedule on Twitch</a>
          <br></br>
          <br></br><input type="time" style={timeStyle} onChange={e => setTime5(e.target.value)}/>&nbsp;<input type="text" style={perfStyle} onChange={e => setPerf5(e.target.value)} placeholder="Performer's Twitch User Name"/>&nbsp;<a style={checkSked} href={"https://www.twitch.tv/" + perf5 + "/schedule"} target="_blank" >Check Schedule on Twitch</a>
          <br></br>
          <br></br><input type="time" style={timeStyle} onChange={e => setTime6(e.target.value)}/>&nbsp;<input type="text" style={perfStyle} onChange={e => setPerf6(e.target.value)} placeholder="Performer's Twitch User Name"/>&nbsp;<a style={checkSked} href={"https://www.twitch.tv/" + perf6 + "/schedule"} target="_blank" >Check Schedule on Twitch</a>
          <br></br>
          <br></br><input type="time" style={timeStyle} onChange={e => setTime7(e.target.value)}/>&nbsp;<input type="text" style={perfStyle} onChange={e => setPerf7(e.target.value)} placeholder="Performer's Twitch User Name"/>&nbsp;<a style={checkSked} href={"https://www.twitch.tv/" + perf7 + "/schedule"} target="_blank" >Check Schedule on Twitch</a>
          <br></br>
          <br></br><input type="time" style={timeStyle} onChange={e => setTime8(e.target.value)}/>&nbsp;<input type="text" style={perfStyle} onChange={e => setPerf8(e.target.value)} placeholder="Performer's Twitch User Name"/>&nbsp;<a style={checkSked} href={"https://www.twitch.tv/" + perf8 + "/schedule"} target="_blank" >Check Schedule on Twitch</a>
          <br></br>
        </div>
        <br></br>
        <button type="button" style={perfStyle} class="btn btn-default btn-lg" onClick={schedule}>Schedule!</button>
        <br></br>
        <p style={messFont}>{mess}</p>
        {/* <p style={messFont}>{mess2}</p> */}
        <p style={messFont}>Sharable link for schedule is: <a style={checkSked} href={mess3}>{mess3}</a></p>
        <p style={messFont}>{mess4}</p>
        <br></br>
    </div>
  );

}

export default Scheduler;