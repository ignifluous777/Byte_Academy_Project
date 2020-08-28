import React from 'react';

export default function Skeditem({skedData}) {

    // const bg = "url('"+ perf[3] +"')"
    // console.log(bg)

    const divStyle = {
        color: 'black',
        textShadow: '2px 2px 4px #000000',
        // fontSize: '50px',
        // display: 'inline',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%', 
        padding: '10px',
        borderStyle: 'outset',
        // backgroundImage: `${bg}`,
        // backgroundSize: 'cover'
        margin: '10px',
        backgroundColor: 'white',
        // border: '5px solid black',
        // opacity: '0.8',
        // paddingTop: '10px',
        // paddingBottom: '10px',
        // paddingLeft: '50px',
        // paddingRight: '50px'
    }

    return(
        <div style={divStyle}>
            <p style={{fontSize: '30px', fontWeight: 'bold'}}>{skedData[1]}:  <a style={{fontSize: '30px', color: 'red', fontWeight: 'bold'}} href={"https://www.twitch.tv/" + skedData[2]} target="_blank" >{skedData[2]}</a></p>
        </div>
    )
}