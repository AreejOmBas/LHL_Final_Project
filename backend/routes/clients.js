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

        console.log(client);
        // validate client if email not exists or incorrect password return err msg
        if (!(client) || !bcrypt.compareSync(password, client.password) ) {

          res.json({
            msg: 'Sorry, email/password not correct'
          });

        } else {
          //console.log(accessTokenSecret)
          const accessToken = jwt.sign( {id:client.id}, secret);

          res.json({
          accessToken,
            
          });

        }
      })
      .catch((err) => res.json({ error: err.message }));
  });

  // Client registration
  router.post('/register', (req, res) => {

    const {
      first_name, last_name, email, phone_num, password, treatment_start_date, 
            treatment_end_date
    } = req.body;
    console.log('inside clients',req.body);

    //const next_survey_date = date

    // to get the date only as string new Date().toDateString()

    getClientByEmail(email)
      .then(client => {

        if (client) {
          res.json({
            msg: 'Sorry, an account with this email already exists'
          });
        } else {
          // values: [firstName, lastName, email, phone_num, password, treatment_start_date, treatment_end_date, signup_date, next_survey_date]
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

/* {
	"first_name":"Sam",
	"last_name":"Jr",
	"email":"sam@jr.com",
	"phone_num": "613-222-3333",
	"password":"password",
	"treatment_start_date":"01-05-2019",
	"treatment_end_date":"25-01-2021"
	
}
 */


// curl --header "Content-Type: application/json" \
// --request POST \
// --data '{	"firstname":"Sam",
// "lastname":"Jr",
// "email":"sam@jr.com",
// "phonenum": "613-222-3333",
// "password":"password",
// "treatmentstartdate":"01-05-2019",
// "treatmentenddate":"25-01-2021"}' \
// http://localhost:3002/api/register