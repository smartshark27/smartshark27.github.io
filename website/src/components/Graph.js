import React from "react";
import ForceGraph2D from 'react-force-graph-2d';

export default function Graph(props) {
    return (
        <ForceGraph2D
            ref={props.fg}
            graphData={props.data}
            onNodeClick={props.handleNodeClick}
        />
    )
}