import Users from "../Model/Users.js";
import TypingInfo from "../Model/TypingInfo.js";
import Leaderboard from "../Model/Leaderboard.js";
const Login = function (request, response) {
  try {
    var email = request.body.email;
    var flag = 0;
    // console.log(request.cookies.verifier.verifier);
    //console.log("query received");
    Leaderboard.find(
      //had to nest cuz await waasnt working
      {},
      null,
      { sort: { avg_speed: -1 } },
      (err, leaderboardData) => {
        // console.log("query received");
        Users.findOne(
          //as there will only be one user
          //find will return a list of objects whereas findone will return a single object
          { email: email }
        )

          .then((docs, err) => {
            if (err) {
              // console.log(err.message);
              response.send({
                message:
                  "Sorry our servers our down currently please try again in some time",
                status: 400,
                loggedIn: false,
                leaderboardData: leaderboardData,
              });
            } else {
              if (docs !== null) {
                if (docs.isValidPassword(request.body.password)) {
                  response.cookie(
                    "verifier",
                    { username: request.body.email, verifier: docs.verifier },
                    {
                      maxAge: 60 * 60 * 24 * 365000, //1year
                      sameSite: "none",
                      secure: true,
                      httpOnly: false,
                    }
                  );
                  flag = 1;

                  //  console.log("correct");
                  // response.send({ data: {}, message: "Successfully Logged In", status: 200 });
                } else {
                  response.send({
                    message: "Incorrect Password",
                    status: 200,
                    loggedIn: false,
                    leaderboardData: leaderboardData,
                  });
                }
              } else {
                response.send({
                  message: "Incorrect Email",
                  status: 200,
                  loggedIn: false,
                  leaderboardData: leaderboardData,
                });
              }
            }
          })
          .then(() => {
            // console.log(flag);
            if (flag == 1) {
              //ie the above query was successfull then i can return the users data
              // console.log(email);
              TypingInfo.findOne({ email, email }, (err, docs) => {
                if (docs !== null) {
                  let data = docs;
                  //   console.log("azzzzzz");
                  //data = [...data, { loggedIn: true }];
                  response.send({
                    data: docs,
                    loggedIn: true,
                    status: 200,
                    leaderboardData: leaderboardData,
                  }); //idk why the spread operator was not working
                }
              });
            }
          })
          .catch((err) => {
            response.send({
              message: "Sorry our servers are down currently",
              error: error.message,
              status: 400,
              leaderboardData: leaderboardData,
            });
          });
        // console.log("sfasdg");
      }
    ).catch((err) => {
      response.send({
        message: "Sorry our servers are down currently",
        error: error.message,
        status: 400,
        leaderboardData: "none",
      });
    });
  } catch (error) {
    response.send({
      message: "Sorry our servers are down currently",
      error: error.message,
      status: 400,
      leaderboardData: "none",
    });
  }
};
export default Login;
