import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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



  return{

    hashPassword,

  }


}