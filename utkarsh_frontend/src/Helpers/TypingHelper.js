import React, { useState } from "react";
import Letter from "../Components/Letter";

var randomwords = require("random-words");
var wordlist = randomwords(20).join(" "); //i dont think anybody can type more than 300 words in a minute
var curr_index = 0;
var mistakes = 0;
//everything above this runs only once
const TypingHelper = () => {
  const [score, setscore] = useState(0);
  const [wascorrect, setwascorrect] = useState(Array(130).fill(0));

  const setarray = (index, value) => {
    setwascorrect((prevState) => {
      let new_correct = [...prevState];
      new_correct[index] = value;
      return new_correct;
    });
  };

  const keypresshandler = (event) => {
    let key = event.key; //keypressed
    if (event.which === 8 || event.which === 46) {
      //backspace case
      mistakes += 1;
      if (event.target.value === "") {
        return;
      }
      if (curr_index == 0) {
        return;
      } else {
        if (wascorrect[curr_index - 1] === 1) {
          setarray(curr_index - 1, 0);
          setscore((prevState) => {
            return prevState - 1;
          });
        } else {
          setarray(curr_index - 1, 0);
        }

        curr_index -= 2;
      }
    } else {
      if (wordlist[curr_index] === key) {
        setarray(curr_index, 1); //this indicates that the key typed in was correct
        setscore((prevState) => {
          return prevState + 1;
        });
      } else {
        mistakes += 1;
        setarray(curr_index, -1);

        //incorrect key pressed
      }
    }

    if (key === " " && wascorrect[curr_index - 1] == 1) {
      //if spacebar is pressed
      console.log("Utkarsh");
      console.log(wascorrect[curr_index - 1]);
      event.target.value = "";
    }
    curr_index += 1;
    // console.log(event.target.value);
    console.log(curr_index);
    console.log(wascorrect);
  };
  let all_letters = [];
  for (let i = 0; i < wordlist.length; i++) {
    if (i !== curr_index) {
      all_letters.push(
        <Letter
          name={wordlist[i]}
          class="normal_char"
          key={i}
          color={wascorrect[i]}
        />
      );
    } //each child in a list should have a unique key prop
    else {
      all_letters.push(
        <Letter
          name={wordlist[i]}
          class="blinkk"
          decor="underline"
          key={i}
          color={wascorrect[i]}
        />
      );
    }
  }
  return (
    <div>
      {console.log("render")}
      {all_letters}
      <br></br>
      <br></br>
      <input type="text" onKeyDown={(e) => keypresshandler(e)} />
      <br></br>
      <br></br>
      <div>Score: {score}</div>
      <div>Mistakes: {mistakes}</div>
    </div>
  );
};
export default TypingHelper;
