import React from "react";
import sample from "../Data/Videos/Video_2.mp4";
import "../Design/Own.css";
import PlaySound from "../Components/PlaySound";
import Tones from "../Data/Songs/TONES AND I - Dance Monkey.mp3";
const HomePage = () => {
  return (
    <div>
      <video className="video_player" autoPlay loop muted>
        <source src={sample} type="video/mp4" />
      </video>
      <PlaySound url={Tones} />
    </div>
  );
};

export default HomePage;
