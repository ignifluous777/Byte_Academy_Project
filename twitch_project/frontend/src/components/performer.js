import React from 'react';

export default function Performer({perf}) {

    const bg = "url('"+ perf[3] +"'), url('https://blog.twitch.tv/assets/uploads/a48c576f5969839b8072631d6f031b2c.png')"
    console.log(bg)

    const divStyle = {
        color: 'black',
        textShadow: '1px 1px 2px #000000',
        fontSize: '30px',
        boxSizing: 'border-box',
        flex: "25%",
        // width: '100%',
        // height: '100%', 
        padding: '40px',
        borderStyle: 'outset',
        backgroundImage: `${bg}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    return(
        <div style={divStyle}>
            {/* <p style={{fontSize: '40px', color: 'red', fontWeight: 'bold', textShadow: '2px 2px 4px #960b4e',}}><a href={"https://www.twitch.tv/" + perf[0]} target="_blank" >{perf[0]}</a></p> */}
            <p><a style={{fontSize: '40px', color: '#f00a79', fontWeight: 'bold', textShadow: '2px 2px 4px #960b4e',}} href={"https://www.twitch.tv/" + perf[0]} target="_blank" >{perf[0]}</a></p>
            <br></br>
            <img src={perf[2]} width="200" height="200" border="2"/>
            <br></br>
            <br></br>
            <div style={{background: '#ffe8fd', opacity: '0.7'}}>
                <p>{perf[1]}</p>
                {/* <a style={{color: 'red', fontWeight: 'bold'}} href={"https://www.twitch.tv/" + perf[0]} target="_blank" >View {perf[0]} on Twitch</a> */}
            </div>
        </div>
    )
}