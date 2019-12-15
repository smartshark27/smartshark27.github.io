import React from "react";
import ForceGraph2D from 'react-force-graph-2d';

const nodeAppearance = {
    "Technology": {
        color: "rgba(66, 135, 245, 0.9)"
    },
    "Project": {
        color: "rgba(88, 199, 54, 0.9)"
    },
    "Default": {
        color: "rgba(245, 135, 66, 0.9)"
    }
}

function nodeSize(node) {
    if (node.skillLevel != null) return node.skillLevel
    else return 3
}

export default function Graph(props) {
    return (
        <ForceGraph2D
            ref={props.fg}
            graphData={props.data}
            onNodeClick={props.handleNodeClick}
            nodeColor={(node) => nodeAppearance[node.type].color}
            nodeVal={nodeSize}
        />
    )
}