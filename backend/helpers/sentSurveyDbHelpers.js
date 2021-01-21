module.exports = (db) => {

  const getSentSurvey = () => {
    const query = {
      text: `SELECT * FROM sent_surveys ` ,
  
  }

  return db
      .query(query)
      .then(result =>{ 
        result.rows
      console.log(result.rows)})
      .catch((err) => err);
}

  
 
  const getSentSurveyByID = id => {

      const query = {
          text: `SELECT * FROM sent_surveys WHERE id = $1` ,
          values: [id]
      }

      return db
          .query(query)
          .then(result => result.rows[0])
          .catch((err) => err);
  };

  const addNewSentSurvey = clientId => {

    const sendingDate = new Date().toDateString('yyyy-mm-dd'); // the date of sending the survey (today date)

    const query = {
        text: `INSERT INTO sent_surveys(survey_id,client_id,date) VALUES ($1,$2,$3) RETURNING *`,
        values: [1,clientId,sendingDate]
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

  

  const addClientResponse = (sentSurveyId,clientId ,response) => {

    /*  id SERIAL PRIMARY KEY NOT NULL,
  sent_survey_id INTEGER REFERENCES sent_surveys(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  client_response VARCHAR(255),
  date DATE */
    const respondDate = new Date().toDateString('yyyy-mm-dd'); // the date of sending the survey (today date)

    const query = {
        text: `INSERT INTO responses(sent_survey_id,client_id,date) VALUES ($1,$2,$3) RETURNING *`,
        values: [1,clientId,sendingDate]
    }

    return db
        .query(query)
        .then(result => result.rows[0])
        .catch((err) => err);
};
 
  return {
    getSentSurvey,
    getSentSurveyByID,
    addNewSentSurvey,
    getClientIdFromSentSurvey
  };
};
