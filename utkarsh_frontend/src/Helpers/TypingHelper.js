import React, { useState, useEffect, useContext } from "react";
import Letter from "../Components/Letter";
import ScoreCard from "./ScoreCard";
import "../Design/TypingTestPage.css";
import { Animated } from "react-animated-css";
import Cust_Button from "../Components/Cust_Button";
import Handle_api from "../Apis/Handle_api";
import { UserContext } from "../GlobalContexts.js/UserContext";
var randomwords = require("random-words");
var wordlist = randomwords(500).join(" "); //i dont think anybody can type more than 300 words in a minute bt still to be on a safer side
var curr_index = 0;
var mistakes = 0;
var next_index = [0];
var pointer = 1;
var play_pause_button = "Play";
let temp = 0;
var unique = 0;
for (let i = 0; i < wordlist.length; i++) {
  if (wordlist[i] === " ") {
    temp += 1;
  }
  if (temp % 9 === 0 && temp !== 0) {
    temp = 0;
    next_index.push(i);
  }
}
var alpha = [
  //first element of the array corresponding to each sub object stores the number of times a letter was pressed incorrectly whereas the second element stores the number of times an element occured
  { a: [0, 0] },
  { b: [0, 0] },
  { c: [0, 0] },
  { d: [0, 0] },
  { e: [0, 0] },
  { f: [0, 0] },
  { g: [0, 0] },
  { h: [0, 0] },
  { i: [0, 0] },
  { j: [0, 0] },
  { k: [0, 0] },
  { l: [0, 0] },
  { m: [0, 0] },
  { n: [0, 0] },
  { o: [0, 0] },
  { p: [0, 0] },
  { q: [0, 0] },
  { r: [0, 0] },
  { s: [0, 0] },
  { t: [0, 0] },
  { u: [0, 0] },
  { v: [0, 0] },
  { w: [0, 0] },
  { x: [0, 0] },
  { y: [0, 0] },
  { z: [0, 0] },
];
//console.log(alpha[2].c[0]);
var reset_clicked = false;
//everything above this runs only once
const TypingHelper = () => {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const [display_score, setDisplayscore] = useState(false);
  unique++; // added it to get rid fo the unique child warning but to no avail
  const input_ref = React.useRef(null); // i will use this to create a reference of the input tag so that i can set its value even though i am clicking a separate element
  const play_button_ref = React.useRef(null);
  var spaces = 0;
  var linecount = 0;
  const [score, setscore] = useState(0);
  const [wascorrect, setwascorrect] = useState(Array(2000).fill(0));
  var total_time = 60;
  const [timer_started, setTimerstarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(total_time);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  if (display_score === true) {
    play_pause_button = "Play Again";
  }
  //temp =0;
  //temp++;everything console log returns 1 because it is reinitialized everytime but this is not the case for statevariable
  //console.log(temp);
  const play_game_handler = (event) => {
    if (play_pause_button === "Reset" || play_pause_button === "Play Again") {
      //this will prevent it from reseting even when i click play making it change two times between a single game instead of just once
      wordlist = randomwords(300).join(" "); //i dont think anybody can type more than 300 words in a minute, new game event handler
      alpha = [
        { a: [0, 0] },
        { b: [0, 0] }, //use map here to save space later on while refractoring
        { c: [0, 0] },
        { d: [0, 0] },
        { e: [0, 0] },
        { f: [0, 0] },
        { g: [0, 0] },
        { h: [0, 0] },
        { i: [0, 0] },
        { j: [0, 0] },
        { k: [0, 0] },
        { l: [0, 0] },
        { m: [0, 0] },
        { n: [0, 0] },
        { o: [0, 0] },
        { p: [0, 0] },
        { q: [0, 0] },
        { r: [0, 0] },
        { s: [0, 0] },
        { t: [0, 0] },
        { u: [0, 0] },
        { v: [0, 0] },
        { w: [0, 0] },
        { x: [0, 0] },
        { y: [0, 0] },
        { z: [0, 0] },
      ];

      curr_index = 0;
      mistakes = 0;
      next_index = [0];
      pointer = 1;
      temp = 0;
      for (let i = 0; i < wordlist.length; i++) {
        if (wordlist[i] === " ") {
          temp += 1;
        }
        if (temp % 9 === 0 && temp !== 0) {
          temp = 0;
          next_index.push(i);
        }
      }
    }
    if (input_ref.current !== null) {
      input_ref.current.value = "";
      input_ref.current.disabled = false;
    }
    if (play_pause_button === "Play") {
      play_pause_button = "Reset";
      reset_clicked = false;
    } else {
      reset_clicked = true;
      if (input_ref.current !== null) input_ref.current.disabled = true;
      setTimerstarted(false);
      console.log(timeLeft);
      play_pause_button = "Play";
    }
    if (input_ref.current !== null) input_ref.current.focus();
    setDisplayscore(false);
    setscore(0);
    setwascorrect(Array(2000).fill(0));

    setTimeLeft(total_time);
    setWpm(0);
    setAccuracy(0);
    setIsVisible(false);

    //  play_button_ref.current.style.visibility = "hidden";
  };

  const setarray = (index, value) => {
    setwascorrect((prevState) => {
      let new_correct = [...prevState];
      new_correct[index] = value;
      return new_correct;
    });
  };
  function start_timer() {
    setTimerstarted(true);
  }

  function stop_timer() {
    setTimerstarted(false);
    input_ref.current.disabled = true;
    play_pause_button = "Play";
    if (timeLeft === 0) {
      //then it means that the time was up and not that i pressed reset
      setDisplayscore(true);
      //console.log(alpha);
      if (localStorage.length > 0) {
        //so that i dont call the api for guest users
        //console.log("hi");
        //console.log(alpha);
        /*console.log({
          wpm: Math.round((score / total_time) * 12),
          errors: mistakes,
          time: total_time,
          accuracy: accuracy,
          alpha: alpha,
        });*/
        if (loggedIn) {
          Handle_api("POST", "/Addscore", {
            wpm: Math.round((score / total_time) * 12), // i am not usign wpm here cuz the latest wpm is yet to be updated the score has been update already so i am just using that
            errors: mistakes,
            time: total_time,
            accuracy: accuracy,
            alpha: alpha, //this send the charactedr data provided that i am logged in
          })
            .then((response) => {
              localStorage.setItem("data", JSON.stringify(response));
              console.log(response);
            })
            .catch((error) => {
              console.log("request");
              console.log(error.message);
            });
        }
      }
    }
    // play_button_ref.current.style.visibility = "hidden";
    setTimeLeft(total_time); //reset the timer
  }
  useEffect(() => {
    if (timer_started === true) {
      if (timeLeft !== total_time) {
        setWpm(Math.round((score / (total_time - timeLeft)) * 12));
        // console.log("wpm: ", wpm);
      }
      setAccuracy(Math.round((score * 100) / (score + mistakes)));

      if (timeLeft <= 0) {
        stop_timer();
      } else {
        const timer = setTimeout(() => {
          let temp = timeLeft;
          if (reset_clicked === false) setTimeLeft(temp - 1);
        }, 1000);
      }
    }
  });
  const backspace_handler = (event) => {
    let key = event.key; //keypressed
    if (event.which === 8 || event.which === 46) {
      //backspace case
      mistakes += 1;
      if (event.target.value === "") {
        return;
      }
      if (curr_index === 0 || curr_index === next_index[pointer]) {
        return;
      } else {
        if (wascorrect[curr_index - 1] === 1) {
          setarray(curr_index - 1, 0);
          setscore((prevState) => {
            return prevState - 1;
          });
        } else {
          mistakes -= 2; //if  i am correcting my mistakes then my accuracy should increase so the net change in mistakes would be mistakes-=1;
          setarray(curr_index - 1, 0);
        }

        curr_index -= 1;
      }
    }
  };
  const keypress_handler = (event) => {
    let key = event.key; //keypressed
    // console.log(key.charCodeAt(0) - 97);
    if (curr_index === 0) {
      start_timer(total_time); //basically when i type my first char only then will the timer be started
    }
    if (event.which === 8 || event.which === 46) {
      //if it was a backspace event then no need
      return;
    } else {
      if (wordlist[curr_index] === key) {
        if (key !== " ") alpha[key.charCodeAt(0) - 97][key][1] += 1; //only totalchar count increased
        setarray(curr_index, 1); //this indicates that the key typed in was correct
        setscore((prevState) => {
          return prevState + 1;
        });
      } else {
        if (wordlist[curr_index] !== " ") {
          //  console.log("space", key);
          //  console.log("currindex", wordlist[curr_index].charCodeAt(0));
          alpha[wordlist[curr_index].charCodeAt(0) - 97][
            wordlist[curr_index]
          ][0]++; //incorrect presses count increased
          alpha[wordlist[curr_index].charCodeAt(0) - 97][
            wordlist[curr_index]
          ][1]++; //totalchar count increased
        }
        mistakes += 1;
        setarray(curr_index, -1);

        //incorrect key pressed
      }
    }

    if (key === " " && wordlist[curr_index] === key) {
      //if spacebar is pressed

      //console.log(wascorrect[curr_index]);
      event.target.value = "";
    }

    if (curr_index === next_index[pointer]) {
      //to switch the line and start from the next line
      pointer += 1;
      event.target.value = "";
    }
    curr_index += 1;
    // console.log(event.target.value);
    if (timeLeft !== total_time) {
      //to avoid divide by zero error n get infinity
      setWpm(Math.round((score / (total_time - timeLeft)) * 12));
      // console.log(wpm);
    }
    setAccuracy(Math.round((score * 100) / (score + mistakes)));
  };
  let all_letters = [];
  unique++;
  for (let i = next_index[pointer - 1]; i < next_index[pointer + 2]; i++) {
    unique++;
    if (wordlist[i] === " ") {
      spaces += 1;
    }
    if (spaces % 10 === 0 && spaces !== 0) {
      all_letters.push(<br></br>);
      linecount++;
      spaces = 0;
    }
    if (linecount >= 2) {
      linecount = 0;
      break;
    }
    if (i !== curr_index) {
      all_letters.push(
        <Letter
          name={wordlist[i]}
          className="normal_char"
          key={unique}
          color={wascorrect[i]}
        />
      );
    } //each child in a list should have a unique key prop
    else {
      all_letters.push(
        <Letter
          name={wordlist[i]}
          className="blinkk"
          decor="underline"
          key={unique}
          color={wascorrect[i]}
        />
      );
    }
  }
  return (
    <div
      // style={{
      //   position: "absolute",
      //   marginTop: "10vmin",
      //   width: "100vw",
      //   height: "100vh",
      //   display: "flex",
      //   flexDirection: "column",
      //   //justifyContent: "space-evenly",
      //   alignItems: "center",
      //   gap: "10vh",
      // }}
      className="safarirootspeedtest"
    >
      <Animated
        animationIn="fadeIn"
        animationOut="slideInUp"
        animationInDelay={200}
        animationOutDelay={0}
        animationInDuration={1000}
        animationOutDuration={500}
        animateOnMount={true}
        isVisible={true}
      >
        <div
          style={{
            height: "20vh",
            width: "92vw",
            //border: "2px solid blue",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="safariscorecardgroup"
        >
          <ScoreCard text="WPM" value={wpm} />
          <ScoreCard text="Time" value={timeLeft} total_time={total_time} />
          <ScoreCard text="Accuracy" value={accuracy} />
        </div>
      </Animated>
      {!display_score ? (
        <Animated
          animationIn="slideInLeft"
          animationOut="fadeOut"
          animationInDelay={0}
          animationOutDelay={0}
          animationInDuration={1000}
          animationOutDuration={500}
          animateOnMount={true}
          isVisible={!display_score}
        >
          <div
            style={{
              marginLeft: "2vh",
              marginRight: "2vh",
              //padding: "4vmin",
              width: "fit-content",
              // border: "0.5vmin solid darkblue",
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            {all_letters}
          </div>
        </Animated>
      ) : (
        ""
      )}
      {!display_score ? (
        <div>
          <Animated
            animationIn="slideInRight"
            animationOut="fadeOut"
            animationInDelay={0}
            animationOutDelay={0}
            animationInDuration={1000}
            animationOutDuration={500}
            animateOnMount={true}
            isVisible={!display_score}
          >
            <input
              className="input_typing"
              style={{
                borderColor: "blue",
                minWidth: "auto",
                height: "2vmax",
                minHeight: "3vh",
                width: "20vmax",

                fontSize: "16px",
                backgroundColor: "transparent",

                fontFamily:
                  "'Comic Sans MS', 'Comic Sans','Marker Felt',sans-serif",
              }}
              placeholder={
                play_pause_button !== "Play" && curr_index === 0
                  ? "Start Typing..."
                  : ""
              }
              type="text"
              onKeyDown={(e) => backspace_handler(e)}
              onKeyUp={(e) => keypress_handler(e)}
              disabled={true}
              ref={input_ref}
            />
          </Animated>
        </div>
      ) : (
        ""
      )}

      {display_score ? (
        <Animated
          animationIn="slideInUp"
          animationOut="slideInDown"
          animationInDelay={0}
          animationOutDelay={0}
          animationInDuration={1000}
          animationOutDuration={500}
          animateOnMount={true}
          isVisible={display_score}
        >
          <div
            className="congrats_message"
            style={{ display: "flex", alignContent: "center" }}
          >
            <span>
              {wpm > 75 ? "Congratulations: " : "Continue Practicing, "}
              <br></br> You have a speed of: {wpm} WPM
            </span>
          </div>
        </Animated>
      ) : (
        ""
      )}
      <Animated
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInDelay={200}
        animationOutDelay={0}
        animationInDuration={1000}
        animationOutDuration={500}
        animateOnMount={true}
        isVisible={true}
      >
        <Cust_Button
          onClick={(e) => play_game_handler(e)}
          ref={play_button_ref}
          name={play_pause_button}
        ></Cust_Button>
      </Animated>

      <div></div>
    </div>
  );
};
export default TypingHelper;
