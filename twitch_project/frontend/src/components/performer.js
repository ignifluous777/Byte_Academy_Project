import React from 'react';

export default function Performer({perf}) {

    const bg = "url('"+ perf[3] +"')"
    console.log(bg)

    const divStyle = {
        color: 'white',
        fontSize: '40px',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%', 
        padding: '80px 1em 0 1em',
        borderStyle: 'outset',
        backgroundImage: `${bg}`
    }

    return(
        <div style={divStyle}>
            <p style={{fontSize: '60px'}}>{perf[0]}</p>
            <img src={perf[2]} width="250" height="250"/>
            <p>Description: {perf[1]}</p>
            <a style={{color: 'red', fontWeight: 'bold'}} href={"https://www.twitch.tv/" + perf[0]} target="_blank" >View {perf[0]} on Twitch</a>
            <p></p>
        </div>
    )
}