import React from "react";
import Header from "./components/Header";
import D3Graph from "./components/Graph";
import InfoOverlay from "./components/InfoOverlay";

const technologyNodes = require("./data/technology.json");
const projectNodes = require("./data/project.json");
const technologyTechnologyLinks = require("./data/technology-technology.json");
const projectTechnologyLinks = require("./data/project-technology.json");
const allNodes = technologyNodes.concat(projectNodes);
const allLinks = technologyTechnologyLinks.concat(projectTechnologyLinks);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0,
      data: {
        nodes: allNodes,
        links: allLinks,
      },
      selectedNode: null,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateNodesAndLinks = this.updateNodesAndLinks.bind(this);
    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.handleHomeButtonClick = this.handleHomeButtonClick.bind(this);
    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
    this.fg = React.createRef();
  }

  handleNodeClick(selectedNode) {
    const links = allLinks.filter((link) => {
      return (
        link.source.id === selectedNode.id || link.target.id === selectedNode.id
      );
    });
    const nodes = allNodes.filter((node) => {
      return (
        node.id === selectedNode.id ||
        links.reduce((isIn, curr) => {
          return (
            isIn || node.id === curr.source.id || node.id === curr.target.id
          );
        }, false)
      );
    });
    this.updateNodesAndLinks(selectedNode, nodes, links);
    this.fg.current.centerAt(selectedNode.x, selectedNode.y, 1000);
    this.fg.current.zoom(3, 1000);
  }

  handleHomeButtonClick() {
    this.updateNodesAndLinks(null, allNodes, allLinks);
    this.fg.current.centerAt(0, 0, 1000);
    this.fg.current.zoom(1, 1000);
  }

  handleBackgroundClick() {
    this.updateNodesAndLinks(
      null,
      this.state.data.nodes,
      this.state.data.links
    );
  }

  updateNodesAndLinks(selectedNode, nodes, links) {
    const state = this.state;
    state.selectedNode = selectedNode;
    state.data.nodes = nodes;
    state.data.links = links;
    this.setState(state);
  }

  updateWindowDimensions() {
    const state = this.state;
    state.windowWidth = window.innerWidth;
    state.windowHeight = window.innerHeight;
    this.setState(state);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  render() {
    return (
      <div>
        <Header handleClick={this.handleHomeButtonClick} />
        <InfoOverlay
          windowWidth={this.state.windowWidth}
          windowHeight={this.state.windowHeight}
          selectedNode={this.state.selectedNode}
        />
        <D3Graph
          fg={this.fg}
          selectedNode={this.state.selectedNode}
          data={this.state.data}
          width={this.state.windowWidth}
          height={this.state.windowHeight}
          handleNodeClick={this.handleNodeClick}
          handleBackgroundClick={this.handleBackgroundClick}
        />
      </div>
    );
  }
}
