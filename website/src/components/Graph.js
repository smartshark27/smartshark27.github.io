import React from "react";
import ForceGraph2D from 'react-force-graph-2d';

export default function Graph(props) {
    const handleClickNode = function(nodeId) {
        //window.alert(`Clicked node ${nodeId}`);
    };

    const handleClickGraph = function() {
        //window.alert(`Clicked the graph background`);
    };
     
    const handleDoubleClickNode = function(nodeId) {
        //window.alert(`Double clicked node ${nodeId}`);
    };

    const onMouseOverNode = function(nodeId) {
        //window.alert(`Mouse over node ${nodeId}`);
    };

    return (
        <ForceGraph2D graphData={props.data}/>
    )
}