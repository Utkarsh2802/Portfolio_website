import React from "react";
import sample from "../Data/Videos/Video_2.mp4";
import "../Design/Own.css";
import PlaySound from "../Components/PlaySound";
import Tones from "../Data/Songs/TONES AND I - Dance Monkey.mp3";
import TypingHelper from "../Helpers/TypingHelper";
const TypingSpeedTest = () => {
  return (
    <div>
      <PlaySound url={Tones} />
      <TypingHelper></TypingHelper>
    </div>
  );
};

export default TypingSpeedTest;
