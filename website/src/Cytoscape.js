const cytoscape = require('cytoscape');

module.exports = {
  getCytoscapeElement: getCytoscapeElement
}

function getCytoscapeElement(nodes, edges) {
  return cytoscape({
    container: document.getElementById("cy"),
    boxSelectionEnabled: false,
    autounselectify: true,
    style: cytoscape
      .stylesheet()
      .selector("node")
      .css({
        height: 60,
        width: 60,
        "background-color": (node) => {
          if (node.data("type") === "Technology") {
            return "rgb(255, 81, 0)"
          }
          else {
            return "rgb(81, 255, 0)"
          }
        },
        "background-opacity": 0.8,
        color: "white",
        "background-fit": "cover",
        "border-width": 0,
        content: "data(name)",
        "text-valign": "center",
        label: "data(name)"
      })
      .selector("edge")
      .css({
        width: 2,
        "line-color": "white",
        "opacity": 0.4,
        "curve-style": "bezier"
      }),
    elements: {
      nodes: nodes,
      edges: edges
    },
    layout: {
      name: "concentric"
    },
    pan: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }
  });
}
