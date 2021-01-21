const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
//const authenticateJWT = require('../helpers/authHelpers.js').authenticateJWT;


const {secret} = require('../helpers/auth-secret.js');


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

module.exports = ({

  getSentSurvey,
  getSentSurveyByID,
}) => {
  router.get('/survey', authenticateJWT , (req, res) => {
    
    const {sentSurveyId} = req.body;
    getSentSurveyByID(1)
        .then((survey) => 
        {
          res.json({msg: 'query was successfull' });



        }
    )
    .catch((err) => res.json({
            error: err.message
    }));
});


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