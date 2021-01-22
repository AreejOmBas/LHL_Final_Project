const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {secret} = require('../helpers/auth-secret.js')



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

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
  })
  }



module.exports ={
    authenticateJWT,
    hashPassword,
    verifyToken

  }