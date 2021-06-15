import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ScoreCard = (props) => {
  let value = props.value;
  if (props.total_time > 0) {
    value = Math.round((props.value * 100) / props.total_time);
  }
  let styles_var = {
    // Customize the root svg element
    root: {},
    // Customize the path, i.e. the "completed progress"
    path: {
      // Path color
      stroke: "green",
      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
      strokeLinecap: "butt",
      // Customize transition animation
      transition: "stroke-dashoffset 0.5s ease 0s",
      // Rotate the path
      transform: "rotate(0.25turn)",
      transformOrigin: "center center",
    },
    // Customize the circle behind the path, i.e. the "total progress"
    trail: {
      // Trail color
      stroke: "red",
      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
      strokeLinecap: "butt",
      // Rotate the trail
      transform: "rotate(0.25turn)",
      transformOrigin: "center center",
    },
    // Customize the text
    text: {
      // Text color
      fill: "black",
      // Text size
      fontSize: "3vmax",
    },
    // Customize background - only used when the `background` prop is true
    background: {
      fill: "blue",
    },
  };
  return (
    <div
      style={{
        position: "fixed",
        left: props.left_width + "vw",
        width: "15vw",
      }}
    >
      <CircularProgressbar
        styles={styles_var}
        background={false}
        value={value}
        text={props.text}
      />
    </div>
  );
};

export default ScoreCard;
