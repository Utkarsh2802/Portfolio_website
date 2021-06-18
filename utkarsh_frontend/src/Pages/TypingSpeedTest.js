import React from "react";
import sample from "../Data/Videos/Video_3.mp4";
import "../Design/Own.css";
import PlaySound from "../Components/PlaySound";
import Tones from "../Data/Songs/TONES AND I - Dance Monkey.mp3";
import TypingHelper from "../Helpers/TypingHelper";
import homepageig from "../Data/Images/hdskyimg.jpg";
import pexel3 from "../Data/Images/pexel3.jpg";
import pexel2 from "../Data/Images/pexels9.jpg"; //confused between either 3 or 2
import { BsMusicNoteBeamed } from "react-icons/bs";
import { IconContext } from "react-icons";
import useWindowDimensions from "../Utility_functions/UseWIndowDimensions";
const TypingSpeedTest = () => {
  //document.body.style ="background-image: linear-gradient(90deg, #0093E9 0%, #80D0C7 100%)";
  document.body.style.padding = 0;
  document.body.style.margin = 0;
  document.body.style.overflowY = "hidden";

  //very important to cover the whole page
  // document.body.style = "background-image:" + homepageimg;
  //    <img src={homepageig} height="100vw" />
  const { height, width } = useWindowDimensions(); //this gives mean the exact height whenever i resize my
  return (
    <div>
      <TypingHelper></TypingHelper>
      <PlaySound url={Tones}></PlaySound>
      <img src={pexel2} height={height} width={width} />
    </div>
  );
};

export default TypingSpeedTest;
