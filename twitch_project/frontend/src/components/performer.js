import React from 'react';

export default function Performer({perf}) {

    const bg = "url('"+ perf[3] +"')"
    console.log(bg)

    const divStyle = {
        color: 'white',
        textShadow: '2px 2px 4px #000000',
        fontSize: '50px',
        boxSizing: 'border-box',
        flex: "33%",
        // width: '100%',
        // height: '100%', 
        padding: '40px',
        borderStyle: 'outset',
        backgroundImage: `${bg}`,
        backgroundSize: 'cover'
    }

    return(
        <div style={divStyle}>
            <p style={{fontSize: '60px', fontWeight: 'bold'}}>{perf[0]}</p>
            <img src={perf[2]} width="250" height="250"/>
            <p>Description: {perf[1]}</p>
            <a style={{color: 'red', fontWeight: 'bold'}} href={"https://www.twitch.tv/" + perf[0]} target="_blank" >View {perf[0]} on Twitch</a>
        </div>
    )
}