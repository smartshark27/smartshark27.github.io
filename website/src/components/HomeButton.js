import React from "react";
import { IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const homeButtonStyle = {
    position: "absolute",
    zIndex: 100,
    top: 10,
    left: 10,
    color: 'white',
}

export default function HomeButton(props) {
    return (
        <IconButton style={homeButtonStyle} onClick={props.handleClick}>
            <HomeIcon/>
        </IconButton>
    )
}