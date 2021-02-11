/* 
  Function to verify a user through the token sent back from the broweser 
*/
const jwt = require('jsonwebtoken');

// verify a user is logged in before displaying survey
const authenticateJWT = function (req, res, next) {

  let headerToken = JSON.stringify(req.headers.authorization)

  if (!headerToken) {
    res.status(401).send('Unauthorized: No token provided');
  } else {

    headerToken = headerToken.split(' ')[1].replace('"', '');
    jwt.verify(headerToken, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        res.status(403).json({ message: 'Unauthorized: Invalid token' });
      } else {
        req.id = decoded.id;
        next();
      }
    });
  }
};


module.exports = {
  authenticateJWT
}