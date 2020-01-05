import React from "react";
import { Box, Container } from '@material-ui/core';
const appearance = require("../appearance.json");

const style = {
    position: "absolute",
    zIndex: 101,
    minHeight: 1,
    borderRadius: 16,
    paddingBottom: 10,
}

export default function InfoOverlay(props) {
    if (noNodeSelected(props.selectedNode)) {
        return null;
    }
    const dynamicStyle = createDynamicStyle(props.selectedNode, props.windowWidth, props.windowHeight);

    return (
        <Container style={dynamicStyle}>
            <CommonProperties selectedNode={props.selectedNode}/>
            <ProjectPropertiesDiv selectedNode={props.selectedNode}/>
            <TechnologyProperties selectedNode={props.selectedNode}/>
        </Container>
    )
}

function noNodeSelected(selectedNode) {
    return selectedNode === null;
}

function createDynamicStyle(selectedNode, windowWidth, windowHeight) {
    const dynamicStyle = {
        ...style,
        backgroundColor: appearance[selectedNode.type].color,
    }
    if (isNarrowScreen(windowWidth)) {
        dynamicStyle["maxWidth"] = windowWidth - 20;
        dynamicStyle["top"] = windowHeight - 75;
        dynamicStyle["left"] = 10;
        dynamicStyle["marginBottom"] = 10;
    } else {
        dynamicStyle["maxWidth"] = windowWidth / 4;
        dynamicStyle["maxHeight"] = windowHeight - 40;
        dynamicStyle["top"] = 20;
        dynamicStyle["right"] = 20;
        dynamicStyle["overflowY"] = "scroll";
    }
    return dynamicStyle;
}

function isNarrowScreen(windowWidth) {
    return windowWidth <= 400;
}

function CommonProperties(props) {
    return (
        <>
            <h6>{props.selectedNode.type.toUpperCase()}</h6>
            <h2>{props.selectedNode.name}</h2>
            <p>{props.selectedNode.description}</p>
        </>
    )
}

function ProjectPropertiesDiv(props) {
    const sn = props.selectedNode;
    const grade = (sn.grade) ? sn.grade.toString() + "/100" : null; 
    return (
        <>
            <OneLineProperty displayName="Year" property={sn.year}/>
            <OneLineProperty displayName="Grade" property={grade}/>
            <Link displayName="Source Code" property={sn.code}/>
        </>
    )
}

function TechnologyProperties(props) {
    const sn = props.selectedNode;
    return (
            <OneLineProperty displayName="Skill Level" property={skillLevelMap(sn.skillLevel)}/>
    )
}

function skillLevelMap(n) {
    if (n === 0) {
        return "Haven't used";
    } else if (n === 1) {
        return "Some knowledge";
    } else if (n === 2) {
        return "Moderate experience";
    } else if (n === 3) {
        return "Deep understanding"
    } else {
        return "";
    }
}

function OneLineProperty(props) {
    const displayName = props.displayName;
    const property = props.property;
    if (!property) {
        return null;
    } else {
        return <p>{displayName + ": " + property}</p>
    }
}

function Link(props) {
    const displayName = props.displayName;
    const property = props.property;
    if (!property) {
        return null;
    } else {
        return (
            <>
                <Box>{displayName + ":"}</Box>
                <a href={property}>{property}</a>
                <p/>
            </>
        )
    }
}