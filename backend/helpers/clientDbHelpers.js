module.exports = (db) => {

  const getClients = () => {
    const query = {
      text: `SELECT id, first_name, last_name, email FROM clients ` ,
  
  }

  return db
      .query(query)
      .then(result =>{ 
        result.rows
      console.log(result.rows)})
      .catch((err) => err);
}

  
 
  const getClientByEmail = email => {

      const query = {
          text: `SELECT id, first_name, last_name, email, password FROM clients WHERE email = $1` ,
          values: [email]
      }

      return db
          .query(query)
          .then(result => result.rows[0])
          .catch((err) => err);
  }
  const addClient = (firstName, lastName, email, phone_num, password, 
    treatment_start_date, treatment_end_date) => {
      let now = new Date();
      // const signup_date = new Date().toDateString(); Wed Jan 20 2021
      let nextMonth = now.setMonth(now.getMonth() + 1, 1);
      const tret_start= new Date(treatment_start_date).toDateString('yyyy-mm-dd');
     const trest_end = new Date(treatment_end_date).toDateString();
console.log(tret_start);
      const next_survey_date = new Date(nextMonth).toDateString();
        //console.log(firstName, lastName, email, phone_num , password,  treatment_start_date, treatment_end_date, signup_date, next_survey_date
          //)
      const query = {
          text: `INSERT INTO clients(first_name, last_name, email, phone_num, password, treatment_start_date, 
            treatment_end_date, signup_date, next_survey_date) VALUES
             ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *` ,
          values: [firstName, lastName, email, phone_num , password,  tret_start, '2021-01-20', '2021-01-20', '2021-01-20']
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
