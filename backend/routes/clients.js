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
  router.get('/logout', (req,res) => {

  })
  /* Client log in and authorize */
  router.post('/login', (req, res) => {

    const { email, password } = req.body;
    getClientByEmail(email)
      .then((client) => {

        console.log(client);
        // validate client if email not exists or incorrect password return err msg
        if (!(client) || !bcrypt.compareSync(password, client.password) ) {
          
          res.json({
            msg: 'Sorry, email/password not correct'
          });

        } else {
       
          const accessToken = jwt.sign( {id:client.id}, secret, { expiresIn: 1200 });

          res.json({
          accessToken,
            
          });

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

