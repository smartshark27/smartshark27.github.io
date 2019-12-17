import React from "react";
import { Container } from '@material-ui/core';
const appearance = require("../appearance.json");

const style = {
    position: "absolute",
    zIndex: 101, // Render above everything else
    top: 20,
    right: 20,
    borderRadius: 16,
    overflowY: "scroll",
}

export default function InfoOverlay(props) {
    const sn = props.selectedNode
    if (sn === null) {
        return null
    }

    const dynamicStyle = {
        maxWidth: props.width,
        minHeight: 1,
        maxHeight: props.height,
        backgroundColor: appearance[sn.type].color
    }

    return (
        <Container style={{ ...style, ...dynamicStyle }}>
            <div>
                <p>{sn.name}</p>
            </div>
        </Container>
    )
}