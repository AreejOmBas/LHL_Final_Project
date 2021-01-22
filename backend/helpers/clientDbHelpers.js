

module.exports = (db) => {

  const getClients = () => {
    const query = {
      text: `SELECT id, first_name, last_name, email FROM clients `,

    }

    return db
      .query(query)
      .then(result => {
        result.rows
        console.log(result.rows)
      })
      .catch((err) => err);
  }

  const getClientById = id => {
    const query = {
      text: `SELECT id, first_name, last_name, email FROM clients WHERE id = $1 `,
      values: [id]
    }

    return db
      .query(query)
      .then(result => {
        result.rows
        console.log(result.rows[0])
      })
      .catch((err) => err);
  }



  const getClientByEmail = email => {

    const query = {
      text: `SELECT id, first_name, last_name, email, password FROM clients WHERE email = $1`,
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
    const signup_date = new Date().toDateString('yyyy-mm-dd');
    let nextMonth = now.setMonth(now.getMonth() + 1, 1);
    const tret_start = new Date(treatment_start_date).toDateString('yyyy-mm-dd');
    const tret_end = new Date(treatment_end_date).toDateString('yyyy-mm-dd');
    console.log(tret_start);
    const next_survey_date = new Date(nextMonth).toDateString('yyyy-mm-dd');
    //console.log(firstName, lastName, email, phone_num , password,  treatment_start_date, treatment_end_date, signup_date, next_survey_date
    //)
    const query = {
      text: `INSERT INTO clients(first_name, last_name, email, phone_num, password, treatment_start_date, 
            treatment_end_date, signup_date, next_survey_date) VALUES
             ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *` ,
      values: [firstName, lastName, email, phone_num, password, tret_start,  tret_end, signup_date, tret_end]
    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };



  const getClientsEmails = () => {
        const query = {
          text: `SELECT email FROM clients ` ,
      
      }

      return db
          .query(query)
          .then(result =>{ 
            return result.rows
          //console.log(result.rows)
        })
          .catch((err) => err);
  }

  
  const getClientIdByEmail = email => {

      const query = {
        text: `SELECT id FROM clients WHERE email = $1`,
        values: [email]
      }

      return db
        .query(query)
        .then(result => {
          return result.rows[0]
        })
        .catch((err) => err);
  }

  return {
    getClients,
    getClientById,
    getClientByEmail,
    addClient,
    getClientsEmails,
    getClientIdByEmail
  };
};
