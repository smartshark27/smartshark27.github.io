import React from "react";
import HomeButton from "./components/HomeButton";
import D3Graph from "./components/Graph";

const technologyNodes = require("./data/technology.json");
const projectNodes = require("./data/project.json");
const technologyTechnologyEdges = require("./data/technology-technology.json");
const projectTechnologyEdges = require("./data/project-technology.json");
const allNodes = technologyNodes.concat(projectNodes);
const allLinks = technologyTechnologyEdges.concat(projectTechnologyEdges);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0,
      data: {
        nodes: allNodes,
        links: allLinks
      },
      selectedNode: null
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    // this.updateNodesAndEdges = this.updateNodesAndEdges.bind(this);
    // this.handleNodeClick = this.handleNodeClick.bind(this);
    // this.handleHomeButtonClick = this.handleHomeButtonClick.bind(this);
  }

  // handleNodeClick(e) {
  //   const selectedNode = e.target;
  //   const edges = allEdges.filter(edge => {
  //     return edge.data.source === e.target.data('id') || edge.data.target === e.target.data('id')
  //   })
  //   const nodes = allNodes.filter(node => {
  //     return node.data.id === e.target.data('id') || edges.reduce((isIn, curr) => {
  //       return isIn || node.data.id === curr.data.source || node.data.id === curr.data.target;
  //     }, false);
  //   })
  //   this.updateNodesAndEdges(selectedNode, nodes, edges);
  // }

  // handleHomeButtonClick() {
  //   this.updateNodesAndEdges(null, allNodes, allEdges);
  // }

  // updateNodesAndEdges(selectedNode, nodes, edges) {
  //   const state = this.state;
  //   state.selectedNode = selectedNode;
  //   state.nodes = nodes;
  //   state.edges = edges;
  //   this.setState(state);
  // }

  updateWindowDimensions() {
    const state = this.state;
    state.windowWidth = window.innerWidth;
    state.windowHeight = window.innerHeight;
    this.setState(state);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    return (
      <div>
        <HomeButton handleClick={this.handleHomeButtonClick} />
        <D3Graph data={this.state.data} width={this.state.windowWidth} height={this.state.windowHeight} />
      </div>
    );
  }
}
