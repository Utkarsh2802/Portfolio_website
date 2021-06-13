import React from "react";
import Letter from "../Components/Letter";
var randomwords = require("random-words");
var wordlist = randomwords(20).join(" "); //i dont think anybody can type more than 300 words in a minute
var curr_index = 0;
var score = 0;
var wascorrect = Array(20).fill(0);
const keypresshandler = (event) => {
  let key = event.key; //keypressed
  if (event.which === 8 || event.which === 46) {
    if (event.target.value === "") {
      return;
    }
    if (curr_index == 0) {
      return;
    } else {
      if (wascorrect[curr_index - 1] === 1) {
        score -= 1;
      }

      curr_index -= 2;
    }
  } else {
    if (wordlist[curr_index] === key) {
      wascorrect[curr_index] = 1; //this indicates that the key typed in was correct
      score += 1;
    } else {
      wascorrect[curr_index] = -1; //this indicates that the key typed in was incorrect
    }
  }
  curr_index += 1;
  if (key === " ") {
    event.target.value = "";
  }
  console.log(event.target.value);
  console.log(score);
};

const TypingHelper = () => {
  let all_letters = [];
  for (let i = 0; i < wordlist.length; i++) {
    if (i <= curr_index) {
      all_letters.push(
        <Letter name={wordlist[i]} key={i} color={wascorrect[i]} />
      );
    } //each child in a list should have a unique key prop
    else {
      all_letters.push(<Letter name={wordlist[i]} color={0} key={i} />);
    }
  }
  return (
    <div>
      {all_letters}
      <input type="text" onKeyDown={(e) => keypresshandler(e)} />
      <div>Score: {score}</div>
    </div>
  );
};
export default TypingHelper;
