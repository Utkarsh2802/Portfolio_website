import React from "react";
import sample from "../Data/Videos/Video_1.mp4";
import "../Design/Own.css";

const HomePage = () => {
  return (
    <div>
      <video className="video_player" autoPlay loop muted>
        <source src={sample} type="video/mp4" />
      </video>
    </div>
  );
};

export default HomePage;
