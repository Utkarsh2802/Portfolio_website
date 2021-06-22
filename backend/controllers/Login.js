import Users from "../Model/Users.js";

const Login = async function (request, response) {
  try {
    var email = request.body.email;
    var password = request.body.password;
    const something = await Users.findOne(
      //as there will only be one user
      //find will return a list of objects whereas findone will return a single object
      { email: email },
      (err, docs) => {
        if (err) {
          response.send({
            message:
              "Sorry our servers our down currently please try again in some time",
            status: 400,
          });
        } else {
          if (docs !== null) {
            if (docs.isValidPassword(request.body.password)) {
              response.send({ message: "Successfully Logged In", status: 200 });
            } else {
              response.send({ message: "Incorrect Password", status: 200 });
            }
          } else {
            response.send({ message: "Incorrect Username", status: 200 });
          }
        }
      }
    );
  } catch (error) {
    response.send({
      message: "Sorry our servers our down currently",
      status: 400,
    });
  }
};
export default Login;
