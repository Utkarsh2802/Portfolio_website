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
  return (
    <span
      className={props.class}
      style={{ color: color_val, textDecoration: props.decor }}
    >
      {props.name}
    </span>
  );
};

export default Letter;
