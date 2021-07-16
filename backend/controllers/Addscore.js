import Users from "../Model/Users.js";
import TypingInfo from "../Model/TypingInfo.js";
import Leaderboard from "../Model/Leaderboard.js";
const Addscore = async function (request, response) {
  //this would run every time the page reloads
  try {
    //var email = request.body.email;
    // console.log(request.cookies);
    // console.log("Addscore clicked");
    var email;
    if (request.cookies != null) {
      //console.log(request.cookies.verifier.verifier);
      const something = await Users.findOne(
        //as there will only be one user
        //find will return a list of objects whereas findone will return a single object
        { verifier: request.cookies.verifier.verifier },
        (err, docs) => {
          if (err) {
            response.send({
              loggednIn: false,
              message:
                "Sorry our servers our down currently please try again in some time",
              error: err,
              status: 400,
              data: {},
            });
          } else {
            if (docs !== null) {
              email = docs.email;
              TypingInfo.findOne({ email: docs.email }, (err, data) => {
                //console.log(data);
                if (data != null) {
                  //console.log(request.body);
                  let alpha = request.body.alpha;
                  let wpm = request.body.wpm;
                  let errors = request.body.errors;
                  let accuracy = request.body.accuarcy;
                  alpha = alpha.map((element, index) => {
                    //i will convert it into suitable alphabetschema of the backend
                    let alphabet = String.fromCharCode(97 + index);
                    //console.log(data);

                    //console.log(data.alpha[index].accuracy);
                    //console.log(typeof data.alpha[index].accuracy);
                    //console.log("break");
                    return {
                      alphabetname: alphabet,
                      //the below conditional statements are written to avoid undefined error during the first insertion
                      total_errors:
                        data.alpha.length > 0
                          ? data.alpha[index].total_errors +
                            element[alphabet][0]
                          : element[alphabet][0],
                      total_count:
                        data.alpha.length > 0
                          ? data.alpha[index].total_count + element[alphabet][1]
                          : element[alphabet][1],
                      accuracy:
                        data.alpha.length > 0
                          ? [
                              ...data.alpha[index].accuracy,
                              (Math.max(element[alphabet][0], 1) /
                                Math.max(element[alphabet][1], 0.5)) *
                                100,
                            ]
                          : [
                              (Math.max(element[alphabet][0], 1) /
                                Math.max(element[alphabet][1], 0.5)) *
                                100,
                            ], //so now if that element is not typed then instead of getting nan cuz of 0/0 we will get 1/0.5 which is 200% accuracy i am keeping it so high so that in the frontend side while making the graph i can skip these values easily
                    };
                  });
                  // console.log(alpha);
                  // console.log("alpha");
                  let newvalues = {
                    email: email,
                    tests_taken: data.tests_taken + 1,
                    avg_speed:
                      (data.avg_speed * data.tests_taken + wpm) /
                      (data.tests_taken + 1),
                    avg_error:
                      (data.avg_error * data.tests_taken + errors) /
                      (data.tests_taken + 1),
                    speed_history: [...data.speed_history, wpm],
                    error_history: [...data.error_history, errors],
                    improvement_speed:
                      data.tests_taken > 0
                        ? (
                            ((data.avg_speed * data.tests_taken + wpm) /
                              (data.tests_taken + 1) -
                              data.speed_history[0]) /
                            data.tests_taken
                          ).toFixed(2)
                        : 0, //basically improvement speed is 0 if i have not taken any tests otherwise it will be the current avg speed - first test speed divided by the total tests taken
                    alpha: alpha,
                  };
                  // console.log(newvalues);
                  Leaderboard.updateOne(
                    { username: docs.username },
                    {
                      username: docs.username,
                      avg_speed: newvalues.avg_speed,
                      tests_taken: newvalues.tests_taken,
                      accuracy: (
                        ((newvalues.avg_speed * 5) /
                          (newvalues.avg_speed * 5 + newvalues.avg_error)) *
                        100
                      ).toFixed(2),
                      improvement_speed: newvalues.improvement_speed.toFixed(2),
                    },
                    (err, res) => {
                      //   if (err) console.log(error.message);
                      //   else console.log("Successfully updated the leaderboard");
                      //
                    }
                  );
                  // console.log("doing");
                  // console.log(email);
                  TypingInfo.updateOne(
                    { email: email },
                    newvalues,
                    (err, res) => {
                      if (err) {
                        //console.log(err.message);
                      } else {
                        //   console.log(res);
                        // console.log("Done");
                      }
                    }
                  ).catch((err) => {
                    console.log(
                      "some error while updating the typinginfo",
                      err.message
                    );
                  });
                  //now i just need to update my database with these values;
                  var leaderboardData = "utkarsh";
                  Leaderboard.find(
                    {},
                    null,
                    { sort: { avg_speed: -1 } },
                    (err, data) => {
                      leaderboardData = data; //i am gonna return it even if the user hasnt logged in
                      //console.log(data);
                      //console.log(leaderboardData);
                    }
                  )
                    .then(() => {
                      // console.log("sending...", newvalues);
                      response.send({
                        loggedIn: true,
                        status: 200,
                        data: newvalues,
                        username: docs.username,
                        leaderboardData: leaderboardData,
                      });
                    })
                    .catch((err) => {
                      console.log(err.message);
                    });
                } else {
                  response.send({ message: "No matching details found" });
                }
              });
            } else {
              response.send({ loggedIn: false, data: {} });
            }
          }
        }
      ).catch((err) => {
        console.log(
          "error called on line 42 of addscore.js in the backend folder"
        );
      });
    } else {
      //this means the cookie was null
      response.send({ loggedIn: false, data: {} });
    }
  } catch (error) {
    response.send({
      message: "Sorry our servers are down currently",
      status: 400,
      error: error.message,
    });
  }
};
export default Addscore;
