import React, { useState, useEffect } from "react";
import "../Design/Own.css";
import music_on from "../Data/Images/music_on.png";
import music_off from "../Data/Images/music_off.png";
import { Animated } from "react-animated-css";

const PlaySound = ({ url, autoPlay = false }) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(autoPlay); //initally playing value is true if autoplay is enabled else flase
  audio.loop = true;
  const toggle = () => setPlaying(!playing); //uses the setplaying function to toggle the state variables value

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]); //whenever playing changes

  //componentdid mount only initially

  return (
    <Animated
      key={playing}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInDelay={0}
      animationOutDelay={0}
      animationInDuration={1000}
      animationOutDuration={500}
      animateOnMount={true}
      isVisible={true}
    >
      <div className="floating" onClick={toggle}>
        {playing ? (
          <img
            style={{
              position: "absolute",
              top: "1vmax",
              right: "2.5vmax",
              width: "3vmax",
              height: "6vh",
              maxHeight: "5vw",
              cursor: "pointer",
            }}
            src={music_on}
            alt={"Please reload to get the music button img"}
          ></img>
        ) : (
          <img
            style={{
              position: "absolute",
              top: "1vmax",
              right: "2vmax",
              width: "4vmax",
              maxHeight: "5vw",
              height: "6vh",
              cursor: "pointer",
            }}
            src={music_off}
            alt={"Please reload to get the music button img"}
          ></img>
        )}
      </div>
    </Animated>
  );
};

export default PlaySound;
