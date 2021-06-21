import Users from "../Model/Users.js";

const login = async function (request, response) {
  try {
    var email = request.body.email;
    var password = request.body.password;
    const something = await Users.findOne(
      //as there will only be one user
      { email: email, password: password },
      (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          if (docs !== null) console.log("Welcome,", docs.username);
          else console.log("Email or password is incorrect");
        }
      }
    );
  } catch (err) {
    console.log("Sorry our servers our down currently");
  }
  response.send("sdf");
};
export default login;
