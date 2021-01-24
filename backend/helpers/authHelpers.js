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
  //const token = req.cookies.jwt;
  //console.log(token);
  const headerToken = JSON.stringify(req.headers.authorization)
  //const headerToken = req.headers['authorization']
  console.log(headerToken);
  console.log(req.ig);

  //console.log(JSON.stringify(req.headers));
  if (!headerToken) {
  console.log('notoken');

    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(headerToken, secret, function(err, decoded) {
      if (err) {
        
        console.log('invalid');

        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.id = decoded.email;
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