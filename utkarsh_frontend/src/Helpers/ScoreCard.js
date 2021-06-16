import React from "react";
import "../Design/Own.css";
const ScoreCard = (props) => {
  let value = props.value;
  if (props.total_time > 0) {
    value = Math.round((props.value * 100) / props.total_time);
  }
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: props.left_width + "vw",
          textAlign: "center",
        }}
      >
        <div
          className="typing_score"
          style={{
            color: "#000000",
            fontSize: "2vw",
          }}
        >
          <br></br>

          <div>
            <span>
              <bold> {props.text}</bold>
              <br></br>
              {props.value}
              {props.text === "Accuracy" ? "%" : ""}
              {props.text === "Time" ? "s" : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
