

module.exports = (db) => {

  const getClientsInfoForQ1 = id => {
    const query = {
      text: `Select first_name as FirstName,last_name,email,phone_num,to_char(treatment_start_date,'DD/MM/YYYY') as start_date,to_char(treatment_end_date,'DD/MM/YYYY')as end_date from clients inner join  sent_surveys on clients.id=sent_surveys.client_id inner join responses on sent_surveys.id=responses.sent_survey_id WHERE question_id=1 and responses.date >= date_trunc('month', current_date - interval '1 month') and responses.date < date_trunc('month', current_date) and client_response='No' order by first_name`,
    }

    return db
      .query(query)
      .then(result => {
       return result.rows
      //  console.log(result.rows[0])
      })
      .catch((err) => err);
  }

  const getYes = id => {
    const query = {
      text: `SELECT question_id, COUNT(question_id) from responses where client_response='Yes' 
      and responses.date >= date_trunc('month', current_date - interval '1 month') and responses.date < date_trunc('month', current_date) group by question_id order by question_id`,
    }

    return db
      .query(query)
      .then(result => {
       return result.rows
      //  console.log(result.rows[0])
      })
      .catch((err) => err);
  }

  const getNo = id => {
    const query = {
      text: `SELECT question_id, COUNT(question_id) from responses where client_response='No' 
      and responses.date >= date_trunc('month', current_date - interval '1 month') and responses.date < date_trunc('month', current_date) group by question_id order by question_id`,
    }

    return db
      .query(query)
      .then(result => {
       return result.rows
      //  console.log(result.rows[0])
      })
      .catch((err) => err);
  }

  const getClientsneedsHelp = id => {
    const query = {
      text: `Select first_name,last_name,email,phone_num,to_char(treatment_start_date,'DD/MM/YYYY') as start_date,to_char(treatment_end_date,'DD/MM/YYYY') as end_date from clients inner join  sent_surveys on clients.id=sent_surveys.client_id inner join responses on sent_surveys.id=responses.sent_survey_id WHERE question_id=7 and responses.date >= date_trunc('month', current_date - interval '1 month') and responses.date < date_trunc('month', current_date) and client_response='No' order by first_name`,
    }

    return db
      .query(query)
      .then(result => {
       return result.rows
      //  console.log(result.rows[0])
      })
      .catch((err) => err);
  }

  const q5Aanswsers = id => {
    const query = {
      text: `select client_response , count(*) as count from responses where question_id=5 group by client_response order by client_response`,
    }

    return db
      .query(query)
      .then(result => {
       return result.rows
      //  console.log(result.rows[0])
      })
      .catch((err) => err);
  }
  return {
    getClientsInfoForQ1,
    getYes,
    getNo,
    getClientsneedsHelp,
    q5Aanswsers,

  };
};