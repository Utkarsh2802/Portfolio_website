import React, { useState, useEffect } from "react";
import "../Design/Globalelements.css";
import music_on from "../Data/Images/music_on.png";
import music_off from "../Data/Images/music_off.png";

const PlaySound = ({ url, autoPlay = false }) => {
  const [audio] = useState(new Audio());
  audio.src = url;
  const [playing, setPlaying] = useState(autoPlay); //initally playing value is true if autoplay is enabled else flase
  audio.loop = true;
  const toggle = () => setPlaying(!playing); //uses the setplaying function to toggle the state variables value

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]); //whenever playing changes

  return (
    <div className="floating" onClick={toggle}>
      {playing ? (
        <img
          className="music_on"
          src={music_on}
          alt={
            "Wanna get good at typing? Or just wanna test your typing speed? Get all features in one for free as we help you become a typing god."
          }
        ></img>
      ) : (
        <img
          className="music_off"
          src={music_off}
          alt={
            "Wanna get good at typing? Or just wanna test your typing speed? Get all features in one for free as we help you become a typing god. "
          }
        ></img>
      )}
    </div>
  );
};

export default PlaySound;
