import React from "react";

const TypingHelper = () => {
  var randomwords = require("random-words");
  var wordlist = randomwords(300); //i dont think anybody can type more than 300 words in a minute
  const handler = (event) => {
    let key = event.key; //keypressed
    if (key === " ") {
      {
        event.target.value = "";
      }
    }
  };
  return (
    <div>
      {wordlist}
      <input type="text" onKeyPress={(e) => handler(e)} />
    </div>
  );
};
export default TypingHelper;
