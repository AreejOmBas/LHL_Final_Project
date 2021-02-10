/* 
  all routes related to the survey (get and post)
*/
const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../helpers/authHelpers.js');


module.exports = ({
  getClientIdFromSentSurvey,
  addClientResponse,
  getQuestionsBySurveyId,
  getResponseBySurveyId,
}) => {

  // Route to access a survey sent with specific id only for authenticated users
  router.get('/survey/:sentSurveyId', authenticateJWT, (req, res) => {
    const sentSurveyId = req.params.sentSurveyId;

    getClientIdFromSentSurvey(sentSurveyId).then(result => {

      if (result.client_id !== req.id) {
        res.status(401).json({ message: "Sorry, This survey does not belong to you" });
        return;
      } else {
        // retrive the questions and responses if any
        Promise.all([getQuestionsBySurveyId(1), getResponseBySurveyId(sentSurveyId)])
          .then(values => {
            res.json({
              questions: values[0],
              savedResponses: values[1]
            })
          })
          .catch((error) => res.json({
            message: error.message
          }));
      }

    })
  });

  // Post route to save client response to specific sent survey
  router.post('/survey/:sentSurveyId', (req, res) => {

    /* response format : {question_id:value,....} */

    const sentSurveyId = req.params.sentSurveyId;
    const responses = req.body.surveyResponse;

    addClientResponse(sentSurveyId, responses).then(results =>

      res.status(200).json({ message: 'done insert responses' })
    );
  });

  // Only to be used for Testing purposes
  /*   router.get('/generate', (req, res) => {
  
      seedResponses().then(result => res.json('success')).catch(error => res.send(error))
  
    })
   */
  return router;
};