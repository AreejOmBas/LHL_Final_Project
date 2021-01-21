const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {secret} = require('../helpers/auth-secret.js')

module.exports = () => {

const hashPassword = password => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = (hashPassword, password) => {
  return bcrypt.compareSync(password, hashPassword);
};

const generateToken = (id) => {
  const token = jwt.sign({
    userId: id
  },
    process.env.SECRET, { expiresIn: '7d' }
  );
  return token;
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, secret, (err, client) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.client = client;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};



  return{
    authenticateJWT,
    hashPassword

  }


}