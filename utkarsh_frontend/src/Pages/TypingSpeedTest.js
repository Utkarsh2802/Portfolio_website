import React from "react";
import sample from "../Data/Videos/Video_3.mp4";
import "../Design/Own.css";
import PlaySound from "../Components/PlaySound";
import Tones from "../Data/Songs/TONES AND I - Dance Monkey.mp3";
import TypingHelper from "../Helpers/TypingHelper";
import homepageig from "../Data/Images/starsimg.jfif";
const TypingSpeedTest = () => {
  document.body.style =
    "background-image: linear-gradient(90deg, #0093E9 0%, #80D0C7 100%)";
  // document.body.style = "background-image:" + homepageimg;
  //    <img src={homepageig} height="100vw" />

  return (
    <div>
      <TypingHelper></TypingHelper>
    </div>
  );
};

export default TypingSpeedTest;
