import React, { useState, useEffect} from 'react';
// import { postRequest } from './models';
import Skeditem from './skeditem'

function Show_sked({ match: { params: {id} }}) {

    // const { match: { params: {id} }} = props;
    console.log(id)
    console.log(id)
    const [sk_id, setSkid] = useState("");

    const [date, setDate] = useState("");
    const [skedData, setSkeddata] = useState([]);

    
    useEffect(() => {
        if (id) {
            setSkid(id)
            showSked();
        } else {}
      }, [])

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
        console.log(data);
        setSkeddata(data);
        setDate(data[0][0]);


    }

    return(
        <div>
            <input style={{width: "400px", height: "50px"}} onChange={e => setSkid(e.target.value)} placeholder="Schedule ID key"/>
            <br></br>
            <br></br>
            <button class="btn btn-default btn-lg" onClick={showSked}>Show Schedule!</button>
            <h3 style={{textShadow: '2px 2px 4px #000000', color: 'white', fontSize: '80px', fontWeight: 'bold'}}>{date}</h3>
            <div id="skeditem">
            {skedData.map((item, index)=> (
                <Skeditem key={index} skedData={item} />
            ))}
            </div>
        </div>
    )
}

export default Show_sked;