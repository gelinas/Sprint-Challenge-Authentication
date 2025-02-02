/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken"); //1:  npm i jsonwebtoken

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

    // check that the token is valid
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        // bad panda, token has been tampered with
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        req.decodedJwt = decodedToken;
        // console.log(req.decodedJwt);
        next();
      }
    });
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
