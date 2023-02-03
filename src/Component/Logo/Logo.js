import React from "react";
import Tilt from 'react-parallax-tilt';
import face from './face.png';

export default function Logo () {
    return(
        <div className ="ma4 mt0">
        <Tilt>
            <div style={{ height: '70px', width: '70px', backgroundColor: 'pink' }}>
                <img src={face} alt="logo" />
            </div>
        </Tilt>
    </div>
    )
}