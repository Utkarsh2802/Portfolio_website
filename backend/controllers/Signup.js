import Users from "../Model/Users.js";
import TypingInfo from "../Model/TypingInfo.js";
import Leaderboard from "../Model/Leaderboard.js";
const Signup = (request, response) => {
  try {
    var course = new Users();
    var user_typing_info = new TypingInfo();
    var leaderboard = new Leaderboard();
    user_typing_info.email = request.body.email;
    course.username = request.body.username;
    leaderboard.username = request.body.username;
    course.setPassword(request.body.password);
    course.email = request.body.email;
    course
      .save()
      .then(() => {
        user_typing_info
          .save()
          .then(() => {
            leaderboard
              .save()
              .then(() => {
                response.send({
                  message: "Successfully signed up!",
                  status: 200,
                });
              })
              .catch((err) => {
                console.log(err.message);
                response.send({
                  message: "Some error while adding entry to new leaderboard",
                  status: 400,
                });
              });
          })
          .catch((err) => {
            console.log(err.message);
            response.send({
              message: "Some error while saving user_typing_info",
              status: 400,
            });
          });
        // console.log("Succesfull Insertion");
      })
      .catch((err) => {
        console.log(err);
        response.send({
          message: "Please make sure that you haven't already signed up",
          status: 200,
        });
      });
  } catch {
    response.send({
      message: "There's some issue with our servers",
      status: 400,
    });
  }
};

export default Signup;
