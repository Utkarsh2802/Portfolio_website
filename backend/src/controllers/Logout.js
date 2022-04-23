import Users from "../Model/Users.js";
import Leaderboard from "../Model/Leaderboard.js";
const Logout = async function (request, response) {
  try {
    //console.log(request.cookies);
    Leaderboard.find(
      {},
      null,
      { sort: { avg_speed: -1 } },
      (err, leaderboardData) => {
        if (request.cookies.length != undefined) {
          //   console.log(request.cookies.verifier.verifier);
          Users.findOne(
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
                  leaderboardData: leaderboardData,
                  status: 400,
                  data: {},
                });
              } else {
                if (docs !== null) {
                  // console.log("Successfully logged out");
                  response.clearCookie("verifier", {
                    maxAge: 0,
                    sameSite: "none",
                    secure: true,
                    httpOnly: false,
                  });

                  response.send({
                    loggedIn: false,
                    data: { username: docs.username },
                    leaderboardData: leaderboardData,
                  });
                } else {
                  response.send({
                    loggedIn: false,
                    data: {},
                    leaderboardData: leaderboardData,
                  });
                }
              }
            }
          );
        } else {
          //this means the cookie was null
          response.send({
            loggedIn: false,
            data: {},
            leaderboardData: leaderboardData,
          });
        }
      }
    ).catch((error) => {
      response.send({
        message: "Sorry our servers are down currently",
        status: 400,
        error: error.message,
        leaderboardData: "none",
      });
    });
  } catch (error) {
    response.send({
      message: "Sorry our servers are down currently",
      status: 400,
      error: error.message,
      leaderboardData: "none",
    });
  }
};
export default Logout;
