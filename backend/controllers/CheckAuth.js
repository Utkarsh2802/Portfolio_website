import Users from "../Model/Users.js";
import TypingInfo from "../Model/TypingInfo.js";
import Leaderboard from "../Model/Leaderboard.js";
const CheckAuth = async function (request, response) {
  //this would run every time the page reloads
  try {
    //var email = request.body.email;
    //console.log(request.cookies);
    var leaderboardData = "utkarsh";
    Leaderboard.find({}, null, { sort: { avg_speed: -1 } }, (err, data) => {
      //i am gonna return it even if the user hasnt logged in
    })
      .then((data) => {
        // console.log(data);
        leaderboardData = data;
        console.log(leaderboardData);
        //console.log("called auth");
        //console.log(leaderboardData);
        //console.log(leaderboardData);
        if (request.cookies != null) {
          //console.log(request.cookies.verifier.verifier);
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
                  status: 400,
                  data: {},
                  leaderboardData: leaderboardData,
                });
              } else {
                if (docs !== null) {
                  TypingInfo.findOne({ email: docs.email }, (err, data) => {
                    // console.log(data);
                    //console.log("hi");
                    if (data != null) {
                      response.send({
                        loggedIn: true,
                        status: 200,
                        data: data,
                        username: docs.username,
                        leaderboardData: leaderboardData, //last minute addition to show username in the frontend on login
                      });
                    } else {
                      response.send({
                        message: "No matching details found",
                        leaderboardData: leaderboardData,
                      });
                    }
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
      })
      .catch((error) => {
        response.send({
          message: "no cookie found",
          status: 400,
          error: error.message,
          leaderboardData: leaderboardData,
        });
      });
  } catch (error) {
    response.send({
      message: "Sorry our servers are down currently",
      status: 400,
      error: error.message,
      leaderboardData: leaderboardData,
    });
  }
};
export default CheckAuth;
