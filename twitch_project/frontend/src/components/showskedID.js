// import React, { useState, useEffect} from 'react';
// // import { postRequest } from './models';
// import Skeditem from './skeditem'

// function Show_skedID() {

//     // const { match: { params } } = props;

//     // const [sk_id, setSkid] = useState(params.id);

//     const [date, setDate] = useState("");

//     const [skedData, setSkeddata] = useState([]);

//     useEffect(() => {
//         showSked();
//       }, [])

//     const showSked = async () => {
//         const configs = {
//             method: "POST",
//             mode: "cors",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({sk_id: sk_id})
//         };

//         const response = await fetch("http://localhost:5000/api/showsked", configs);
//         const data = await response.json();
//         console.log(data);
//         setSkeddata(data);
//         setDate(data[0][0]);

//     }

//     return(
//         <div>
//             <input onChange={e => setSkid(e.target.value)} placeholder="Schedule ID key"/>
//             <button onClick={showSked}>Show Schedule!</button>
//             <h3 style={{textShadow: '2px 2px 4px #000000', color: 'white', fontSize: '80px', fontWeight: 'bold'}}>{date}</h3>
//             <div id="skeditem">
//             {skedData.map((item, index)=> (
//                 <Skeditem key={index} skedData={item} />
//             ))}
//             </div>
//         </div>
//     )
// }

// export default Show_skedID;