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
  }

 
  return {
    getSentSurvey,
    getSentSurveyByID,
    
  };
};
