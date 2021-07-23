import React from "react";
import { VscSearch } from "react-icons/vsc";
import "../Design/LoginandSignupPage.css";
const LeaderboardFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <>
      <VscSearch style={{ color: "purple" }} />
      <input
        className="inputfield"
        style={{
          width: "10vw",
          textAlign: "center",
          fontSize: "1.5vmax",
          borderWidth: "0 0 0.3vmin 0",
        }}
        value={filterValue || ""}
        placeholder={"Username"}
        onChange={(e) => setFilter(e.target.value)}
      />
    </>
  );
};

export default LeaderboardFilter;
