import React from "react";
const cytoscape = require("./Cytoscape");
const technologyNodes = require("./data/technology.json").nodes;
const projectNodes = require("./data/project.json").nodes;
const technologyTechnologyEdges = require("./data/technology-technology.json").edges;
const projectTechnologyEdges = require("./data/project-technology.json").edges;

const allNodes = technologyNodes.concat(projectNodes);
const allEdges = technologyTechnologyEdges.concat(projectTechnologyEdges);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0,
      nodes: allNodes,
      edges: allEdges,
      selectedNode: null
    };
    this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  renderCytoscapeElement() {
    this.cy = cytoscape.getCytoscapeElement(this.state.nodes, this.state.edges);
    this.cy.nodes().on('click', this.handleNodeClick)
  }

  handleNodeClick(e) {
    const state = this.state;
      state.selectedNode = e.target;
      state.edges = allEdges.filter(edge => {
        return edge.data.source === e.target.data('id') || edge.data.target === e.target.data('id')
      })
      state.nodes = allNodes.filter(node => {
        return state.edges.reduce((isIn, curr) => {
          return isIn || node.data.id === curr.data.source || node.data.id === curr.data.target;
        }, false);
      })
      this.setState(state);
      this.renderCytoscapeElement();
  }

  updateWindowDimensions() {
    const state = this.state;
    state.windowWidth = window.innerWidth;
    state.windowHeight = window.innerHeight;
    this.setState(state);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
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
