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

  const addClientResponse = async (sentSurveyId, responses) => {


    const pool = new Pool();

    const respondDate = new Date().toDateString('yyyy-mm-dd'); // the date of sending the survey (today date)
    let values = [];
    console.log(responses);

    for (let questionId in responses) {
    
      values.push(
        [sentSurveyId, questionId, responses[questionId], respondDate]

      )
    }
    
    let i = 0;
    for (let value of values) {
      await db.query('INSERT INTO responses(sent_survey_id,question_id,client_response,date) VALUES ($1, $2,$3,$4)',
        [value[0], value[1], value[2], value[3]], (error, results) => {
          if (error) {
            console.log(error)
            throw error
          } else {
       
          }
        });
    }
  
    
    // return db
    //   .query(query)
    //   .then(result => { console.log('response inserted'); return result.rows; })
    //   .catch((err) => console.log(err));
  }

  const seedResponses= async () => {

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    function randomDate(start, end) {
      var date = new Date(+start + Math.random() * (end - start));
      // var hour = startHour + Math.random() * (endHour - startHour) | 0;
      //date.setHours(hour);
      return date.toISOString().slice(0, 10);
    }
    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }


    let responsesSeeds = [];

    let yesOrNo = ['Yes', 'No'];
    let comment = [' ', 'No further comments', 'My stay was grate and helped me to recover and live a good life', 
                    'I love the survey app'];

    let i, j;
    for (i = 1; i < 50; i++) {
      let date = randomDate(new Date(2020, 10, 1), new Date(2020, 11, 31));
      for (j = 1; j < 7; j++) {
        if (j === 5) {
          responsesSeeds.push([i, j, getRandomArbitrary(1, 6), date]);

        }
        else if (j === 6) {
          responsesSeeds.push([i, j, comment[getRandomInt(4)], date]);

        }
        else {
          let resQ7=yesOrNo[getRandomInt(2)]; 
          if (j===1 && resQ7==='No'){
            responsesSeeds.push([i, j, resQ7, date]);
            responsesSeeds.push([i, 7, yesOrNo[getRandomInt(2)], date]);
            
          }
          else {
            responsesSeeds.push([i, j,resQ7, date]);
          }

        }

      }
    }
    let sentSurveySeeds = [];
  
 let e =21;
    for(i = 1 ; i < 50 ; i ++ ){
      sentSurveySeeds.push([1,e+i]);

    }

     
    for (let value of sentSurveySeeds) {
     // console.log(value)
      await db.query('INSERT INTO sent_surveys(survey_id,client_id) VALUES ($1,$2)',
        [value[0], value[1]], (error, results) => {
          if (error) {
            console.log(error)
            throw error
          } else {
       
          }
        });
    }
    
    for (let value of responsesSeeds) {
     // console.log(value)
      await db.query('INSERT INTO responses(sent_survey_id,question_id,client_response,date) VALUES ($1, $2,$3,$4)',
        [value[0], value[1], value[2], value[3]], (error, results) => {
          if (error) {
            console.log(error)
            throw error
          } else {
       
          }
        });
    }



  }


  return {
    getSentSurvey,
    getSentSurveyByID,
    addNewSentSurvey,
    getClientIdFromSentSurvey,
    addClientResponse,
    getQuestionsBySurveyId,
    seedResponses
  };
};