import Users from "../Model/Users.js";

const create_user = (request, response) => {
  try {
    var course = new Users();
    course.username = request.body.username;
    course.password = request.body.password;
    course.email = request.body.email;
    course
      .save()
      .then(() => console.log("Succesfull Insertion"))
      .catch((err) =>
        console.log(
          "Please make sure that you haven't already signed up and that your password has atleast 8 characters"
        )
      );
  } catch {
    response.send("There's some issue with our severs at the moment");
  }
};

export default create_user;
