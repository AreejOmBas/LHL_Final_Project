const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {authenticateJWT} = require('../helpers/authHelpers.js');


const {secret} = require('../helpers/auth-secret.js');




module.exports = ({
  getSentSurvey,
  getSentSurveyByID,
  addNewSentSurvey,
  getClientIdFromSentSurvey,
  addClientResponse
  
  
}) => {

  router.get('/survey/:sentSurveyId',authenticateJWT , (req, res) => {
    
  const sentSurveyId = req.params.sentSurveyId;
      getSentSurveyByID(sentSurveyId)
        .then((survey) => 
        {
          res.json({msg: 'query was successfull', survey });
        }
    )
    .catch((err) => res.json({
            error: err.message
    }));
});

router.post('/survey/:sentSurveyId', (req, res) => {


  const sentSurveyId = req.params.sentSurveyId;
  //let clientId ;
console.log(sentSurveyId, req.params)

  getClientIdFromSentSurvey(sentSurveyId)
  .then(id => 
    
   //res.json({msg: `client id ${id.client_id}`})
    addClientResponse(sentSurveyId,id.client_id)
   ).then()
  .catch((err) => res.json({
    error: err.message
  }));
 


  //add client responses to  responses table 


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