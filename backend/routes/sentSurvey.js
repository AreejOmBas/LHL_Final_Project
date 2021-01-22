const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { authenticateJWT } = require('../helpers/authHelpers.js');

const { secret } = require('../helpers/auth-secret.js');





module.exports = ({
  getSentSurvey,
  getSentSurveyByID,
  addNewSentSurvey,
  getClientIdFromSentSurvey,
  addClientResponse,
  getQuestionsBySurveyId


}) => {

  // Route to access a survey sent with specific id
  router.get('/survey/:sentSurveyId', authenticateJWT, (req, res) => {
    const sentSurveyId = req.params.sentSurveyId;

    getSentSurveyByID(sentSurveyId)
      .then((survey) =>
        getQuestionsBySurveyId(1)
      ).then(questions => res.json({ questions }))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  // Post route to save client response to specific sent survey
  router.post('/survey/:sentSurveyId', (req, res) => {

    /* response format : {question_id:value,....} */
    const sentSurveyId = req.params.sentSurveyId;
    const responses = req.body;

    addClientResponse(sentSurveyId, responses).then(
      res.json({ msg: 'done insert responses' })
    );
  });

  return router;
};

