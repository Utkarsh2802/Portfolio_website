import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
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
      stroke: "#00802b",
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
      stroke: "#000099",
      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
      strokeLinecap: "round",
      // Rotate the trail
      transform: "rotate(0.25turn)",
      transformOrigin: "center center",
    },
    // Customize the text
    text: {
      // Text color
      fill: "black",
      // Text size
      fontSize: "1.2vw",
    },
    // Customize background - only used when the `background` prop is true
    background: {
      fill: "linear-gradient(to top left, #ff5050 27%, #0000cc 100%);",
    },
  };
  return (
    <div>
      <div
        style={{
          position: "fixed",
          left: props.left_width + "vw",
          width: "12vw",
          textAlign: "center",
        }}
      >
        <CircularProgressbarWithChildren
          styles={styles_var}
          background={false}
          value={value}
        >
          <div
            className="glow_utkarsh"
            style={{
              fontSize: "2vw",
            }}
          >
            <bold> {props.text}</bold>
            <br></br>
            {props.value}
          </div>
        </CircularProgressbarWithChildren>
        ;
      </div>
    </div>
  );
};

export default ScoreCard;
