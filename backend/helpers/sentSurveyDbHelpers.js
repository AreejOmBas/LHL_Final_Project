/* 
  All database calls related to the sent_survey table
*/

module.exports = (db) => {

  // returns all sent_surveys
  const getSentSurvey = () => {
    const query = {
      text: `SELECT * FROM sent_surveys `,

    }
    return db
      .query(query)
      .then(result => result.rows)
      .catch(err => err);
  };
  // return single record with specific id
  const getSentSurveyByID = id => {

    const query = {
      text: `SELECT * FROM sent_surveys WHERE id = $1`,
      values: [id]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };
  // add new record in the sent_surveys table
  const addNewSentSurvey = clientId => {

    const sendingDate = new Date().toDateString('yyyy-mm-dd'); // the date of sending the survey (today date)

    const query = {

      text: `INSERT INTO sent_surveys(survey_id,client_id,date) VALUES ($1,$2,$3) RETURNING *`,
      values: [1, clientId, sendingDate]
    }

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };
  // Get the corresponding client for an id 
  const getClientIdFromSentSurvey = sentSurveyId => {

    const query = {
      text: `SELECT client_id FROM sent_surveys WHERE id = $1`,
      values: [sentSurveyId]
    }

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  // returns questions from the DB
  const getQuestionsBySurveyId = (survey_id) => {

    const query = {
      text: `SELECT id as question_id, question_text, type as question_type FROM questions WHERE survey_id = $1 `,
      values: [survey_id]
    }
    return db
      .query(query)
      .then(result => result.rows)
      .catch(err => err);
  };

  //return the responses of a particular  sent_survey 
  const getResponseBySurveyId = (sentSurveyId) => {

    const query = {
      text: `SELECT question_id, client_response as answer FROM responses WHERE sent_survey_id = $1 `,
      values: [sentSurveyId]
    }

    return db
      .query(query)
      .then(result => result.rows)
      .catch(err => err);

  }
  // add the client(user) responses to the survey questions
  const addClientResponse = async (sentSurveyId, responses) => {


    const respondDate = new Date().toDateString('yyyy-mm-dd'); // the date of submitting the survey (today date)
    let values = [];

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

            throw error
          } else {

          }
        });
    }
  }
  // Generates responses for testing purposes ONLY
  /* const seedResponses = async () => {

    //return random integer between 0 and max
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    //return random date between start month and end month
    function randomDate(start, end) {
      var date = new Date(+start + Math.random() * (end - start));
  
      return date.toISOString().slice(0, 10);
    }
    //return random number between min and max
    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    let responsesSeeds = [];

    let yesOrNo = ['Yes', 'No']; // needed for yes or no questions
    let comment = [' ', 'No further comments', 'My stay was grate and helped me to recover and live a good life',
      'I love the survey app']; // comments 

    let i, j;
    // generate random data for responses table
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
          let resQ7 = yesOrNo[getRandomInt(2)];
   
          if (j === 1 && resQ7 === 'No') {
      
            responsesSeeds.push([i, j, resQ7, date]);
            responsesSeeds.push([i, 7, yesOrNo[getRandomInt(2)], date]);

          }
          else {
            responsesSeeds.push([i, j, resQ7, date]);
          }
          
        }

      }
    }
    let sentSurveySeeds = [];
    let e = 21;
    //generate sent_surveys records 
    for (i = 1; i < 50; i++) {
      sentSurveySeeds.push([1, e + i]);
    }
    // insert into sent_surveys table
    for (let value of sentSurveySeeds) {
  
      await db.query('INSERT INTO sent_surveys(survey_id,client_id) VALUES ($1,$2)',
        [value[0], value[1]], (error, results) => {
          if (error) {
      
            throw error
          } else {

          }
        });
    }
    // insert into responses table
    for (let value of responsesSeeds) {

      await db.query('INSERT INTO responses(sent_survey_id,question_id,client_response,date) VALUES ($1, $2,$3,$4)',
        [value[0], value[1], value[2], value[3]], (error, results) => {
          if (error) {
    
            throw error
          } else {

          }
        });
    }
  }
 */



  return {
    getSentSurvey,
    getSentSurveyByID,
    addNewSentSurvey,
    getClientIdFromSentSurvey,
    addClientResponse,
    getQuestionsBySurveyId,
    getResponseBySurveyId,
    // seedResponses
  };
}