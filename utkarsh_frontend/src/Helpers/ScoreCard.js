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
            fontSize: "2.5vw",
          }}
        >
          <br></br>

          <div>
            <bold> {props.text}</bold>
            <br></br>

            {props.value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
