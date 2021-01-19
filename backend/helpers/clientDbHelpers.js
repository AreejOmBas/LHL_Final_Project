module.exports = (db) => {
  const getClients = () => {
      const query = {
          text: 'SELECT first_name, last_name, email FROM clients',
      };

      return db
          .query(query)
          .then((result) => result.rows)
          .catch((err) => err);
  };

  const getClientByEmail = email => {

      const query = {
          text: `SELECT id, first_name, last_name, email FROM clients WHERE email = $1` ,
          values: [email]
      }

      return db
          .query(query)
          .then(result =>{ 
            result.rows[0]
          console.log(result.rows[0])})
          .catch((err) => err);
  }

  const addClient = (firstName, lastName, email, phone_num, password, 
    treatment_start_date ,
    treatment_end_date,
  signup_date,
  next_survey_date) => {
      const query = {
          text: `INSERT INTO users (first_name, last_name, email, phone_num , password,
            treatment_end_date, treatment_end_date, signup_date, next_survey_date) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *` ,
          values: [firstName, lastName, email, phone_num , password,  treatment_start_date, treatment_end_date, signup_date, next_survey_date]
      }

      return db.query(query)
          .then(result => result.rows[0])
          .catch(err => err);
  }

 

  return {
    getClients,
    getClientByEmail,
    addClient
  };
};
