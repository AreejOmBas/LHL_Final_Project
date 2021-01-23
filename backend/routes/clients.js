const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {secret} = require('../helpers/auth-secret.js');



module.exports = ({
  getClients,
  getClientByEmail,
  addClient,

}) => {
  router.get('/clients', (req, res) => {
    getClients()
        .then((clients) => res.json(clients))
        .catch((err) => res.json({
            error: err.message
        }));
});
  /* Client log in and authorize */
  router.post('/login', (req, res) => {

    const { email, password } = req.body;
    getClientByEmail(email)
      .then((client) => {

        // validate client if email not exists or incorrect password return err msg
        if (!(client) || !bcrypt.compareSync(password, client.password) ) {

         
            res.status(400).json({
              accessToken:null,
              message: "Sorry, email/password not correct"});
       
            return;
         

        } else {
        
          const accessToken = jwt.sign( {id:client.email}, secret, {expiresIn: 300});
         res.cookie('token', accessToken, { httpOnly: true });
          res.status(200).json({
            accessToken,
            message: "Log in successful"});

        }
      })
      .catch((err) => res.json({ error: err.message }));
  });

  // Client registration form submit
  router.post('/register', (req, res) => {

    const {
      first_name, last_name, email, phone_num, password, treatment_start_date, 
            treatment_end_date
    } = req.body;
    console.log('inside clients',req.body);

     getClientByEmail(email)
      .then(client => {

        if (client) {
          res.json({
            msg: 'Sorry, an account with this email already exists'
          });
        } else {
          const hashedPassword = bcrypt.hashSync(password, 10);
          return addClient(first_name, last_name, email, phone_num, hashedPassword, 
            treatment_start_date, treatment_end_date) ;
        }
    })
      .then(newClient => {res.json(newClient); console.log(newClient)})
      .catch(err => res.json({
        error: err.message
      }));

  })

  return router;
};

