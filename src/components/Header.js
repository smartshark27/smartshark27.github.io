import React from "react";
import { IconButton, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const containerStyle = {
  position: "absolute",
  zIndex: 101,
  marginTop: 10,
  marginLeft: 10,
};

const homeButtonStyle = {
  color: "black",
};

const titleStyle = {
  marginLeft: 10,
  marginTop: 14,
};

export default function Header(props) {
  return (
    <Box display="flex" style={containerStyle}>
      <IconButton style={homeButtonStyle} onClick={props.handleClick} size="large">
        <HomeIcon />
      </IconButton>
      <Box fontWeight="fontWeightBold" style={titleStyle}>
        smartshark27 (Thomas Smart)
      </Box>
    </Box>
  );
}
