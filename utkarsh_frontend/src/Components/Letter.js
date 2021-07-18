import React from "react";
import "../Design/TypingTestPage.css";
const Letter = (props) => {
  var color_val;
  if (props.color === -1) {
    color_val = "#b30047";
  } else if (props.color === 1) {
    color_val = "#0d3300";
  } else {
    color_val = "blue";
  }
  return (
    <span
      className={props.class}
      style={{
        color: color_val,
        textDecoration: props.decor,
        fontSize: "1.75vmax",
      }}
    >
      {props.name}
    </span>
  );
};

export default Letter;
