import React from "react";
import "../Design/Own.css";
const Letter = (props) => {
  var color_val;
  if (props.color === -1) {
    color_val = "red";
  } else if (props.color === 1) {
    color_val = "green";
  } else {
    color_val = "blue";
  }
  let styles = { color: color_val };
  return <span style={{ color: color_val }}>{props.name}</span>;
};

export default Letter;
