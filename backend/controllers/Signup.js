import Users from "../Model/Users.js";
import TypingInfo from "../Model/TypingInfo.js";
const Signup = (request, response) => {
  try {
    var course = new Users();
    var user_typing_info = new TypingInfo();
    user_typing_info.email = request.body.email;
    course.username = request.body.username;
    course.setPassword(request.body.password);
    course.email = request.body.email;
    course
      .save()
      .then(() => {
        user_typing_info
          .save()
          .then(() => {
            response.send({
              message: "Successfully signed up!",
              status: 200,
            });
          })
          .catch((err) => {
            console.log("some error while saving user_typing_info");
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
