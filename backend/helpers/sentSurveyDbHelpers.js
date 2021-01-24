const { response } = require("express");
const { Pool } = require('pg');

module.exports = (db) => {

  const getSentSurvey = () => {
    const query = {
      text: `SELECT * FROM sent_surveys `,

    }

    return db
      .query(query)
      .then(result => {
        result.rows
        console.log(result.rows)
      })
      .catch((err) => err);
  };

  const getSentSurveyByID = id => {

    const query = {
      text: `SELECT * FROM sent_surveys WHERE id = $1`,
      values: [id]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const addNewSentSurvey = clientId => {

    const sendingDate = new Date().toDateString('yyyy-mm-dd'); // the date of sending the survey (today date)

    const query = {
      text: `INSERT INTO sent_surveys(survey_id,client_id,date) VALUES ($1,$2,$3) RETURNING *`,
      values: [1, clientId, sendingDate]
    }

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const getClientIdFromSentSurvey = sentSurveyId => {

    const query = {
      text: `SELECT client_id FROM sent_surveys WHERE id = $1`,
      values: [sentSurveyId]
    }

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const getQuestionsBySurveyId = (survey_id) => {

    const query = {
      text: `SELECT id as question_id, question_text, type as question_type FROM questions WHERE survey_id = $1 `,
      values: [survey_id]
    }
    console.log("inside helper")

    return db
      .query(query)
      .then(result => { console.log(result.rows); return result.rows; })
      .catch((err) => err);
  };

  const addClientResponse = (sentSurveyId, responses) => {


    const pool = new Pool();

    const respondDate = new Date().toDateString('yyyy-mm-dd'); // the date of sending the survey (today date)
    let values = [];
    console.log(responses);

    for (let questionId in responses) {
    
      values.push(
        [sentSurveyId, questionId, responses[questionId], respondDate]

      )
    }
    console.log(values);
    const query = {
      text: "INSERT INTO responses(sent_survey_id,question_id,client_response,date) VALUES ?",
      values: values
    };
    let i = 0;
    for (let value of values) {
      db.query('INSERT INTO responses(sent_survey_id,question_id,client_response,date) VALUES ($1, $2,$3,$4) RETURNING *',
        [value[0], value[1], value[2], value[3]], (error, results) => {
          if (error) {
            console.log(error)
            throw error
          } else {
            console.log("Rows " + JSON.stringify(results.rows));
          }
        });
    }
  
    
    // return db
    //   .query(query)
    //   .then(result => { console.log('response inserted'); return result.rows; })
    //   .catch((err) => console.log(err));
  }




  return {
    getSentSurvey,
    getSentSurveyByID,
    addNewSentSurvey,
    getClientIdFromSentSurvey,
    addClientResponse,
    getQuestionsBySurveyId
  };
};