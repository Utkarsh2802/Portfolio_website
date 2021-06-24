import React from "react";
import "../Design/Own.css";
import PlaySound from "../Components/PlaySound";
import Tones from "../Data/Songs/TONES AND I - Dance Monkey.mp3";
import useWindowDimensions from "../Utility_functions/UseWIndowDimensions";
const HomePage = () => {
  document.body.style.padding = 0;
  document.body.style.margin = 0;
  document.body.style.overflow = "hidden";
  const { height, width } = useWindowDimensions();

  /*  <video autoPlay loop muted>
        <source src={sample} type="video/mp4" />
      </video>
    */
  return (
    <div style={{ height: height, width: width }}>
      <PlaySound url={Tones} />
    </div>
  );
};

export default HomePage;
