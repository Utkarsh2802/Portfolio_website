import React, { useState, useEffect } from "react";

import "../Design/Own.css";
import TypingHelper from "../Helpers/TypingHelper";
import pexel2 from "../Data/Images/pexels9.jpg"; //confused between either 3 or 2
import { Animated } from "react-animated-css";
import useWindowDimensions from "../Utility_functions/UseWIndowDimensions";
const TypingSpeedTest = () => {
  console.log("helo");
  const [image, setImage] = useState("");
  //document.body.style ="background-image: linear-gradient(90deg, #0093E9 0%, #80D0C7 100%)";
  document.body.style.padding = 0;
  document.body.style.margin = 0;
  document.body.style.overflowY = "hidden";
  //very important to cover the whole page
  // document.body.style = "background-image:" + homepageimg;
  //    <img src={homepageig} height="100vw" />
  const { height, width } = useWindowDimensions(); //this gives mean the exact height whenever i resize my
  useEffect(() => {
    setImage(
      <img
        src={pexel2}
        height={height}
        width={width}
        alt="Some Error occured while loading the background"
      />
    );
  }, [height, width]);
  return (
    <div>
      <Animated
        animationIn="fadeIn"
        animationInDelay={500}
        animationInDuration={1000}
        animateOnMount={true}
        isVisible={true}
      >
        {image}
      </Animated>
      <div style={{ position: "absolute", top: "5vh", left: 0 }}>
        <TypingHelper></TypingHelper>
      </div>
    </div>
  );
};

export default TypingSpeedTest;
