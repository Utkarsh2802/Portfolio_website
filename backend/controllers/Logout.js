import Users from "../Model/Users.js";
const Logout = async function (request, response) {
  try {
    console.log(request.cookies);
    if (request.cookies != null) {
      console.log(request.cookies.verifier.verifier);
      const something = await Users.findOne(
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
            });
          } else {
            if (docs !== null) {
              console.log("Successfully logged out");
              response.clearCookie("verifier", {
                maxAge: 0,
                sameSite: "none",
                secure: true,
                httpOnly: false,
              });
              response.send({
                loggedIn: false,
                data: { username: docs.username },
              });
            } else {
              response.send({ loggedIn: false, data: {} });
            }
          }
        }
      );
    } else {
      //this means the cookie was null
      response.send({ loggedIn: false, data: {} });
    }
  } catch (error) {
    response.send({
      message: "Sorry our servers are down currently",
      status: 400,
      error: error.message,
    });
  }
};
export default Logout;
