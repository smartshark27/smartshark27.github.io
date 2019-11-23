import React from "react";
const cytoscape = require("./Cytoscape");
const technologyNodes = require("./data/technology.json").nodes;
const projectNodes = require("./data/project.json").nodes;
const technologyTechnologyEdges = require("./data/technology-technology.json").edges;
const projectTechnologyEdges = require("./data/project-technology.json").edges;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0,
      nodes: [],
      edges: []
    };
    this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateNodesAndEdges = this.updateNodesAndEdges.bind(this);
  }

  renderCytoscapeElement() {
    this.cy = cytoscape.getCytoscapeElement(this.state.nodes, this.state.edges);
  }

  updateWindowDimensions() {
    const state = this.state;
    state.windowWidth = window.innerWidth;
    state.windowHeight = window.innerHeight;
    this.setState(state);
  }

  updateNodesAndEdges(nodes, edges) {
    const state = this.state;
    state.nodes = nodes;
    state.edges = edges;
    this.setState(state);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    const nodes = technologyNodes.concat(projectNodes);
      
    const edges = technologyTechnologyEdges.concat(projectTechnologyEdges);
    this.updateNodesAndEdges(nodes, edges);
    this.renderCytoscapeElement();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    return (
      <div style={{ backgroundColor: "black", width: this.state.windowWidth, height: this.state.windowHeight }} id="cy" />
    );
  }
}
