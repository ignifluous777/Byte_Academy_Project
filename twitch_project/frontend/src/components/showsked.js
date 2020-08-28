import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
// import { postRequest } from './models';
import Skeditem from './skeditem'

function Show_sked() {

    let { id } = useParams();
    console.log({id})
    console.log({id}["id"])

    const [sk_id, setSkid] = useState({id}["id"]);
    const [date, setDate] = useState("");
    const [skedData, setSkeddata] = useState([]);
    const [failmess, setFailmess] = useState("");

    
    useEffect(() => {
        if ({id}["id"]) {
            // setSkid({id}["id"])
            showSked();
            // setSkid("")
        } else {}
      }, [])

    const showSked = async () => {
        const configs = {
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({sk_id: sk_id})
        };
        const response = await fetch("http://localhost:5000/api/showsked", configs);
        const data = await response.json();
        console.log(data);
        if (data !== "") {
            setSkeddata(data);
            setDate(data[0][0]);
            setFailmess("")
            } else {
              setFailmess("Schedule Not Found")
              setDate("");
              setSkeddata([]);
            };
    }

    const divStyle = {
        margin: '20px',
        backgroundColor: '#ffe8fd',
        border: '1px solid black',
        opacity: '0.8',
        paddingTop: '30px',
        paddingBottom: '30px',
        paddingLeft: '250px',
        paddingRight: '250px' 
      }

    return(
        <div style={divStyle}>
            <input style={{border: '2px solid black', width: "400px", height: "50px", fontWeight: 'bold'}} onChange={e => setSkid(e.target.value)} placeholder="Schedule ID key"/>
            <br></br>
            <br></br>
            <button style={{border: '2px solid black'}} class="btn btn-default btn-lg" onClick={showSked}>Show Schedule!</button>
            <br></br>
            <p style={{color: 'black', fontSize: '30px'}}>{failmess}</p>
            <h3 style={{textShadow: '2px 2px 4px #000000', color: 'black', fontSize: '40px', fontWeight: 'bold'}}>{date}</h3>
            <div id="skeditem">
            {skedData.map((item, index)=> (
                <Skeditem key={index} skedData={item} />
            ))}
            </div>
        </div>
    )
}

export default Show_sked;