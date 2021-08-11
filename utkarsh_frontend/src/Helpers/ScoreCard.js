import React from "react";
import "../Design/TypingTestPage.css";
const ScoreCard = (props) => {
  let value = props.value;
  if (props.totalTime > 0) {
    value = Math.round((props.value * 100) / props.totalTime);
  }
  return (
    <div
      className="typing-score"
      style={{
        display: "flex",
        color: "#000000",
        fontSize: "2vmax",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <span>{props.text}</span> <br></br>
        <span>
          {props.value}
          {props.text === "Accuracy" ? "%" : ""}
          {props.text === "Time" ? "s" : ""}
        </span>
      </div>
    </div>
  );
};

export default ScoreCard;
