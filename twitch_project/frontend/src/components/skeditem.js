import React from 'react';

export default function Skeditem({skedData}) {

    // const bg = "url('"+ perf[3] +"')"
    // console.log(bg)

    const divStyle = {
        color: 'white',
        textShadow: '2px 2px 4px #000000',
        // fontSize: '50px',
        // display: 'inline',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%', 
        padding: '10px',
        borderStyle: 'outset'
        // backgroundImage: `${bg}`,
        // backgroundSize: 'cover'
    }

    return(
        <div style={divStyle}>
            <p style={{fontSize: '50px', fontWeight: 'bold'}}>{skedData[1]}:  <a style={{fontSize: '50px', color: 'red', fontWeight: 'bold'}} href={"https://www.twitch.tv/" + skedData[2]} target="_blank" >{skedData[2]}</a></p>
        </div>
    )
}