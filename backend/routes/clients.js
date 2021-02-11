/* 
  All the routes related to a Client (user) e.g login / register
  client here refer to a user. 
*/
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = ({
  getClients,
  getClientByEmail,
  addClient,

}) => {
  // can be used if there is an Admin page to list all the clients 
/*   router.get('/clients', (req, res) => {
    getClients()
        .then((clients) => res.json(clients))
        .catch((err) => res.json({
            error: err.message
        }));
}); */

  /* Client log in and authorize with JWT token */
  router.post('/login', (req, res) => {

    const { email, password } = req.body;

    getClientByEmail(email)
      .then((client) => {

        // validate client if email not exists or incorrect password return err msg
        if (!(client) || !bcrypt.compareSync(password, client.password) ) {
         
            res.status(400).json({
              accessToken:null,
              message: 'Sorry, email/password not correct'});
       
            return;
        } else {
        
          let accessToken = jwt.sign( {id:client.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1hr'});
       
          res.status(200).json({
            accessToken,
            message: 'Log in successful',
            clientId : client.id,
            firstName: client.firstName,
            email: client.email
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
  
     getClientByEmail(email)
      .then(client => {

        if (client) {
          res.status(400).json({
            message: 'Sorry, an account with this email already exists'
          });
        } else {
          const hashedPassword = bcrypt.hashSync(password, 10);

          return addClient(firstName, lastName, email, phoneNum, hashedPassword, treatmentStartDate, treatmentEndDate) 
            .then(newClient => {
              res.status(200).json({
                message: 'Thank you!',
                client: newClient.firstName
              });
            })
            .catch(err => res.json({ error: err.message }));
        }
      })
      

  });
  // returns all the client related routes
  return router;
};

