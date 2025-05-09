import React from "react";
import ForceGraph2D from "react-force-graph-2d";
const appearance = require("../appearance.json");

var supportsTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;

export default function Graph(props) {
  return (
    <ForceGraph2D
      ref={props.fg}
      enableNodeDrag={!supportsTouch}
      graphData={props.data}
      onNodeClick={props.handleNodeClick}
      onBackgroundClick={props.handleBackgroundClick}
      nodeColor={(node) => appearance[node.type].color}
      nodeVal={nodeSize}
      nodeCanvasObject={renderLabel}
      nodeCanvasObjectMode={() => "after"}
    />
  );
}

function nodeSize(node) {
  if (node.skillLevel != null) return node.skillLevel;
  else if (node.size != null) return node.size * node.size;
  else return 3;
}

function renderLabel(node, ctx, globalScale) {
  if (globalScale < 1.5) return;
  const fontSize = 15 / globalScale;
  ctx.font = `${fontSize}px "Exo 2"`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "black";
  const bottomDistance = nodeSize(node) + 10;
  ctx.fillText(node.name, node.x, node.y + bottomDistance);
}
