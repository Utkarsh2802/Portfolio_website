import Users from "../Model/Users.js";

const Signup = (request, response) => {
  try {
    var course = new Users();
    course.username = request.body.username;
    course.setPassword(request.body.password);
    course.email = request.body.email;
    course
      .save()
      .then(() => {
        // console.log("Succesfull Insertion");
        response.send({
          message: "Successfully signed up!",
          status: 200,
        });
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
