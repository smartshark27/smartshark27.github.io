import React from "react";
import { Container } from '@material-ui/core';
const appearance = require("../appearance.json");

const style = {
    position: "absolute",
    zIndex: 101, // Render above everything else
    borderRadius: 16,
    paddingBottom: 10,
}

export default function InfoOverlay(props) {
    const sn = props.selectedNode
    if (sn === null) {
        return null
    }

    const isNarrowScreen = props.windowWidth <= 400;
    const dynamicStyle = {
        backgroundColor: appearance[sn.type].color,
        minHeight: 1,
    }
    if (isNarrowScreen) {
        dynamicStyle["maxWidth"] = props.windowWidth - 20
        dynamicStyle["minHeight"] = 1
        dynamicStyle["top"] = props.windowHeight - 75
        dynamicStyle["left"] = 10
        dynamicStyle["marginBottom"] = 10
    } else {
        dynamicStyle["maxWidth"] = props.windowWidth / 4
        dynamicStyle["minHeight"] = 1
        dynamicStyle["maxHeight"] = props.windowHeight - 40
        dynamicStyle["top"] = 20
        dynamicStyle["right"] = 20
        dynamicStyle["overflowY"] = "scroll"
    }

    return (
        <Container style={{ ...style, ...dynamicStyle }}>
            <h2>{sn.name}</h2>
            <p>{sn.description}</p>
        </Container>
    )
}