import React, { useState, useEffect, useContext } from "react";
import Letter from "../Components/Letter";
import ScoreCard from "./ScoreCard";
import "../Design/TypingTestPage.css";
import { Animated } from "react-animated-css";
import CustButton from "../Components/CustButton";
import HandleApi from "../Apis/HandleApi";
import { UserContext } from "../GlobalContexts.js/UserContext";
var randomwords = require("random-words");
var wordList = randomwords(500).join(" "); //i dont think anybody can type more than 300 words in a minute bt still to be on a safer side
var currIndex = 0;
var mistakes = 0;
var nextIndex = [0];
var pointer = 1;
var playPauseButton = "Play";
let temp = 0;
var unique = 0;
for (let i = 0; i < wordList.length; i++) {
  if (wordList[i] === " ") {
    temp += 1;
  }
  if (temp % 9 === 0 && temp !== 0) {
    temp = 0;
    nextIndex.push(i);
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
  const [displayScore, setDisplayScore] = useState(false);
  unique++; // added it to get rid fo the unique child warning but to no avail
  const inputRef = React.useRef(null); // i will use this to create a reference of the input tag so that i can set its value even though i am clicking a separate element
  const playButtonRef = React.useRef(null);
  var spaces = 0;
  var lineCount = 0;
  const [score, setScore] = useState(0);
  const [wasCorrect, setWasCorrect] = useState(Array(2000).fill(0));
  var totalTime = 60;
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  if (displayScore === true) {
    playPauseButton = "Play Again";
  }
  //temp =0;
  //temp++;everything console log returns 1 because it is reinitialized everytime but this is not the case for statevariable
  //console.log(temp);
  const playGameHandler = (event) => {
    if (playPauseButton === "Reset" || playPauseButton === "Play Again") {
      //this will prevent it from reseting even when i click play making it change two times between a single game instead of just once
      wordList = randomwords(300).join(" "); //i dont think anybody can type more than 300 words in a minute, new game event handler
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

      currIndex = 0;
      mistakes = 0;
      nextIndex = [0];
      pointer = 1;
      temp = 0;
      for (let i = 0; i < wordList.length; i++) {
        if (wordList[i] === " ") {
          temp += 1;
        }
        if (temp % 9 === 0 && temp !== 0) {
          temp = 0;
          nextIndex.push(i);
        }
      }
    }
    if (inputRef.current !== null) {
      inputRef.current.value = "";
      inputRef.current.disabled = false;
    }
    if (playPauseButton === "Play") {
      playPauseButton = "Reset";
      reset_clicked = false;
    } else {
      reset_clicked = true;
      if (inputRef.current !== null) inputRef.current.disabled = true;
      setTimerStarted(false);
      console.log(timeLeft);
      playPauseButton = "Play";
    }
    if (inputRef.current !== null) inputRef.current.focus();
    setDisplayScore(false);
    setScore(0);
    setWasCorrect(Array(2000).fill(0));

    setTimeLeft(totalTime);
    setWpm(0);
    setAccuracy(0);
    setIsVisible(false);

    //  playButtonRef.current.style.visibility = "hidden";
  };

  const setArray = (index, value) => {
    setWasCorrect((prevState) => {
      let new_correct = [...prevState];
      new_correct[index] = value;
      return new_correct;
    });
  };
  function startTimer() {
    setTimerStarted(true);
  }

  function stopTimer() {
    setTimerStarted(false);
    inputRef.current.disabled = true;
    playPauseButton = "Play";
    if (timeLeft === 0) {
      //then it means that the time was up and not that i pressed reset
      setDisplayScore(true);
      //console.log(alpha);
      if (localStorage.length > 0) {
        //so that i dont call the api for guest users
        //console.log("hi");
        //console.log(alpha);
        /*console.log({
          wpm: Math.round((score / totalTime) * 12),
          errors: mistakes,
          time: totalTime,
          accuracy: accuracy,
          alpha: alpha,
        });*/
        if (loggedIn) {
          HandleApi("POST", "/Addscore", {
            wpm: Math.round((score / totalTime) * 12), // i am not usign wpm here cuz the latest wpm is yet to be updated the score has been update already so i am just using that
            errors: mistakes,
            time: totalTime,
            accuracy: accuracy,
            alpha: alpha, //this send the charactedr data provided that i am logged in
            verifier: localStorage.getItem("verifier"),
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
    // playButtonRef.current.style.visibility = "hidden";
    setTimeLeft(totalTime); //reset the timer
  }
  useEffect(() => {
    if (timerStarted === true) {
      if (timeLeft !== totalTime) {
        setWpm(Math.round((score / (totalTime - timeLeft)) * 12));
        // console.log("wpm: ", wpm);
      }
      setAccuracy(Math.round((score * 100) / (score + mistakes)));

      if (timeLeft <= 0) {
        stopTimer();
      } else {
        const timer = setTimeout(() => {
          let temp = timeLeft;
          if (reset_clicked === false) setTimeLeft(temp - 1);
        }, 1000);
      }
    }
  });
  var oldValue = "";
  const backspaceHandler = (event) => {
    oldValue = event.target.value;
  };
  const keypressHandler = (event) => {
    if (currIndex === 0) {
      startTimer(totalTime); //basically when i type my first char only then will the timer be started
    }
    var key;
    if (oldValue.length > event.target.value.length) {
      //backspace casec
      mistakes += 1;
      // if (event.target.value === "") {
      //   return;
      // }
      //uncomment the above three lines if something breaks this was basically causing the cursor stuck on the first correct character of a word which was kinda annoying
      if (currIndex === 0 || currIndex === nextIndex[pointer]) {
        return;
      } else {
        if (wasCorrect[currIndex - 1] === 1) {
          setArray(currIndex - 1, 0);
          setScore((prevState) => {
            return prevState - 1;
          });
        } else {
          mistakes -= 2; //if  i am correcting my mistakes then my accuracy should increase so the net change in mistakes would be mistakes-=1;
          setArray(currIndex - 1, 0);
        }

        currIndex -= 1;
      }
      return;
    } else {
      key = event.target.value[event.target.value.length - 1];
      if (wordList[currIndex] === key) {
        if (key !== " ") alpha[key.charCodeAt(0) - 97][key][1] += 1; //only totalchar count increased
        setArray(currIndex, 1); //this indicates that the key typed in was correct
        setScore((prevState) => {
          return prevState + 1;
        });
      } else {
        if (wordList[currIndex] !== " ") {
          //  console.log("space", key);
          //  console.log("currindex", wordList[currIndex].charCodeAt(0));
          alpha[wordList[currIndex].charCodeAt(0) - 97][
            wordList[currIndex]
          ][0]++; //incorrect presses count increased
          alpha[wordList[currIndex].charCodeAt(0) - 97][
            wordList[currIndex]
          ][1]++; //totalchar count increased
        }
        mistakes += 1;
        setArray(currIndex, -1);

        //incorrect key pressed
      }
    }

    if (key === " " && wordList[currIndex] === key) {
      //if spacebar is pressed

      //console.log(wasCorrect[currIndex]);
      event.target.value = "";
    }

    if (currIndex === nextIndex[pointer]) {
      //to switch the line and start from the next line
      pointer += 1;
      event.target.value = "";
    }
    currIndex += 1;
    // console.log(event.target.value);
    if (timeLeft !== totalTime) {
      //to avoid divide by zero error n get infinity
      setWpm(Math.round((score / (totalTime - timeLeft)) * 12));
      // console.log(wpm);
    }
    setAccuracy(Math.round((score * 100) / (score + mistakes)));
  };
  let allLetters = [];
  unique++;
  for (let i = nextIndex[pointer - 1]; i < nextIndex[pointer + 2]; i++) {
    unique++;
    if (wordList[i] === " ") {
      spaces += 1;
    }
    if (spaces % 10 === 0 && spaces !== 0) {
      allLetters.push(<br></br>);
      lineCount++;
      spaces = 0;
    }
    if (lineCount >= 2) {
      lineCount = 0;
      break;
    }
    if (i !== currIndex) {
      allLetters.push(
        <Letter
          name={wordList[i]}
          className="normal-char"
          key={unique}
          color={wasCorrect[i]}
        />
      );
    } //each child in a list should have a unique key prop
    else {
      allLetters.push(
        <Letter
          name={wordList[i]}
          className="blinkk"
          decor="underline"
          key={unique}
          color={wasCorrect[i]}
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
      className="safari-root-speed-test"
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
          className="safari-score-card-group"
        >
          <ScoreCard text="WPM" value={wpm} />
          <ScoreCard text="Time" value={timeLeft} totalTime={totalTime} />
          <ScoreCard text="Accuracy" value={accuracy} />
        </div>
      </Animated>
      {!displayScore ? (
        <Animated
          animationIn="slideInLeft"
          animationOut="fadeOut"
          animationInDelay={0}
          animationOutDelay={0}
          animationInDuration={1000}
          animationOutDuration={500}
          animateOnMount={true}
          isVisible={!displayScore}
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
            {allLetters}
          </div>
        </Animated>
      ) : (
        ""
      )}
      {!displayScore ? (
        <div>
          <Animated
            animationIn="slideInRight"
            animationOut="fadeOut"
            animationInDelay={0}
            animationOutDelay={0}
            animationInDuration={1000}
            animationOutDuration={500}
            animateOnMount={true}
            isVisible={!displayScore}
          >
            <input
              className="input-typing"
              style={{
                borderColor: "blue",
                minWidth: "auto",
                height: "2vmax",
                minHeight: "3vh",
                width: "20vmax",
                fontSize: "1.5vmax",
                backgroundColor: "transparent",

                fontFamily:
                  "'Comic Sans MS', 'Comic Sans','Marker Felt',sans-serif",
              }}
              placeholder={
                playPauseButton !== "Play" && currIndex === 0
                  ? "Start Typing..."
                  : ""
              }
              type="text"
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              onKeyDown={(e) => backspaceHandler(e)}
              onInput={(e) => keypressHandler(e)}
              disabled={true}
              ref={inputRef}
            />
          </Animated>
        </div>
      ) : (
        ""
      )}

      {displayScore ? (
        <Animated
          animationIn="slideInUp"
          animationOut="slideInDown"
          animationInDelay={0}
          animationOutDelay={0}
          animationInDuration={1000}
          animationOutDuration={500}
          animateOnMount={true}
          isVisible={displayScore}
        >
          <div
            className="congrats-message"
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
        <CustButton
          onClick={(e) => playGameHandler(e)}
          ref={playButtonRef}
          name={playPauseButton}
        ></CustButton>
      </Animated>

      <div></div>
    </div>
  );
};
export default TypingHelper;
