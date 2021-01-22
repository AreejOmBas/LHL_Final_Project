const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {secret} = require('../helpers/auth-secret.js')



const hashPassword = password => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = (hashPassword, password) => {
  return bcrypt.compareSync(password, hashPassword);
};


const authenticateJWT = function(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}
;


module.exports ={
    
    hashPassword,
    authenticateJWT

  }