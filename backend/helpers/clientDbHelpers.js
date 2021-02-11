
/* 
  Database calls realted to client table
*/
module.exports = (db) => {

  const getClients = () => {
    const query = {
      text: `SELECT id, first_name, last_name, email FROM clients `,

    }

    return db
      .query(query)
      .then(result => result.rows)
      .catch(err => err);
  }

  const getClientById = id => {
    const query = {
      text: `SELECT id, first_name, last_name, email FROM clients WHERE id = $1 `,
      values: [id]
    }

    return db
      .query(query)
      .then(result => result.rows)
      .catch(err => err);
  }

  const getClientByEmail = email => {

    const query = {
      text: `SELECT id, first_name, last_name, email, password FROM clients WHERE email = $1`,
      values: [email]
    }

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  }

  const addClient = (firstName, lastName, email, phone_num, password,
    treatmentStartDate, treatmentEndDate) => {

    // this is to calculate the date of the next survey this client has to fill if needed
    let now = new Date();
    const signup_date = new Date().toDateString('yyyy-mm-dd');
    let nextMonth = now.setMonth(now.getMonth() + 1, 1);
    const next_survey_date = new Date(nextMonth).toDateString('yyyy-mm-dd');

    // format dates from the from to DB acceptable foramt
    const tret_start = new Date(treatmentStartDate).toDateString('yyyy-mm-dd');
    const tret_end = new Date(treatmentEndDate).toDateString('yyyy-mm-dd');

    const query = {
      text: `INSERT INTO clients(first_name, last_name, email, phone_num, password, treatment_start_date, 
            treatment_end_date, signup_date, next_survey_date) VALUES
             ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *` ,
      values: [firstName, lastName, email, phone_num, password, tret_start, tret_end, signup_date, next_survey_date]
    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  // used when generating report and sending surveys by email
  const getClientsInfo = () => {
    const query = {
      text: `SELECT first_name, email, id FROM clients `,
    }

    return db
      .query(query)
      .then(result => {
        return result.rows
        //console.log(result.rows)
      })
      .catch(err => err);
  }

  const getClientsEmails = () => {
    const query = {
      text: `SELECT email FROM clients `,

    }

    return db
      .query(query)
      .then(result => result.rows)
      .catch(err => err);
  }


  const getClientIdByEmail = email => {

    const query = {
      text: `SELECT id FROM clients WHERE email = $1`,
      values: [email]
    }

    return db
      .query(query)
      .then(result => result.rows[0] )
      .catch(err => err);
  }

  const getFirstNameById = clientId => {

    const query = {
      text: `SELECT first_name FROM clients WHERE id = $1`,
      values: [clientId]
    }

    return db
      .query(query)
      .then(result => result.rows[0] )
      .catch((err) => err);
  }


  return {
    
    getClients,
    getClientById,
    getClientByEmail,
    addClient,
    getClientsEmails,
    getClientIdByEmail,
    getFirstNameById,
    getClientsInfo

  };
};