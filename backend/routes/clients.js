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
    console.log(req.body)
    getClientByEmail(email)
      .then((client) => {

        // validate client if email not exists or incorrect password return err msg
        if (!(client) || !bcrypt.compareSync(password, client.password) ) {

         
            res.status(400).json({
              accessToken:null,
              message: "Sorry, email/password not correct"});
       
            return;
         

        } else {
        
          const accessToken = jwt.sign( {id:client.id}, secret, {expiresIn: '1hr'});
          //res.cookie('jwt',accessToken, { httpOnly: true, secure: false, maxAge: 3600000 })
        
          res.status(200).json({
            accessToken,
            message: "Log in successful",
            client
          });

        }
      })
      .catch((err) => res.json({ error: err.message }));
  });

  // Client registration form submit
  router.post('/register', (req, res) => {
     
    const {
      firstName, lastName, email, phoneNum, password, treatmentStartDate, 
      treatmentEndDate
    } = req.body
    console.log('inside clients',req.body);

     getClientByEmail(email)
      .then(client => {

        if (client) {
          res.status(400).json({
            message: 'Sorry, an account with this email already exists'
          });
        } else {
          const hashedPassword = bcrypt.hashSync(password, 10);

          return addClient(firstName, lastName, email, phoneNum, hashedPassword, 
            treatmentStartDate, treatmentEndDate) 
            .then(newClient => {
              res.status(200).json({
                message: 'Thank you!',
                client: newClient
              });
              
              console.log('newClient',newClient)})
            .catch(err => res.json({
                  error: err.message
                  }));
        }
      })
      

  });

  

  return router;
};

