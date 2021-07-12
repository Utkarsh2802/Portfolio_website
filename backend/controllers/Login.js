import Users from "../Model/Users.js";
import TypingInfo from "../Model/TypingInfo.js";
const Login = async function (request, response) {
  try {
    var email = request.body.email;
    var flag = 0;
    // console.log(request.cookies.verifier.verifier);
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
            loggedIn: false,
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
              // response.send({ data: {}, message: "Successfully Logged In", status: 200 });
            } else {
              response.send({
                message: "Incorrect Password",
                status: 200,
                loggedIn: false,
              });
            }
          } else {
            response.send({
              message: "Incorrect Email",
              status: 200,
              loggedIn: false,
            });
            response.send({
              message: "Incorrect Email",
              status: 200,
              loggedIn: false,
            });
          }
        }
      }
    );

    if (flag == 1) {
      //ie the above query was successfull then i can return the users data
      const query2 = await TypingInfo.findOne({ email, email }, (err, docs) => {
        if (docs !== null) {
          let data = docs;

          //data = [...data, { loggedIn: true }];
          response.send({ data: docs, loggedIn: true, status: 200 }); //idk why the spread operator was not working
        }
      });
    }
  } catch (error) {
    response.send({
      message: "Sorry our servers are down currently",
      error: error.message,
      status: 400,
    });
  }
};
export default Login;
