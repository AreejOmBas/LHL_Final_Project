

module.exports = (db) => {

  const getQ1Yes = id => {
    const query = {
      text: `select count(*) from responses WHERE question_id=1 and responses.date >= date_trunc('month', current_date - interval '1 month') and responses.date < date_trunc('month', current_date) and client_response='Yes' `,
    }

    return db
      .query(query)
      .then(result => {
       return result.rows[0]
      //  console.log(result.rows[0])
      })
      .catch((err) => err);
  }


  const getQ1No = id => {
    const query = {
      text: `select count(*) from responses WHERE question_id=1 and responses.date >= date_trunc('month', current_date - interval '1 month') and responses.date < date_trunc('month', current_date) and client_response='No' `,
    }

    return db
      .query(query)
      .then(result => {
       return result.rows[0]
      //  console.log(result.rows[0])
      })
      .catch((err) => err);
  }

  const getQ2Yes = id => {
    const query = {
      text: `select count(*) from responses WHERE question_id=2 and responses.date >= date_trunc('month', current_date - interval '1 month') and responses.date < date_trunc('month', current_date) and client_response='Yes' `,
    }

    return db
      .query(query)
      .then(result => {
       return result.rows[0]
      //  console.log(result.rows[0])
      })
      .catch((err) => err);
  }


  const getQ2No = id => {
    const query = {
      text: `select count(*) from responses WHERE question_id=2 and responses.date >= date_trunc('month', current_date - interval '1 month') and responses.date < date_trunc('month', current_date) and client_response='No' `,
    }

    return db
      .query(query)
      .then(result => {
       return result.rows[0]
      //  console.log(result.rows[0])
      })
      .catch((err) => err);
  }


  const getQ3Yes = id => {
    const query = {
      text: `select count(*) from responses WHERE question_id=3 and responses.date >= date_trunc('month', current_date - interval '1 month') and responses.date < date_trunc('month', current_date) and client_response='Yes' `,
    }

    return db
      .query(query)
      .then(result => {
       return result.rows[0]
      //  console.log(result.rows[0])
      })
      .catch((err) => err);
  }


  const getQ3No = id => {
    const query = {
      text: `select count(*) from responses WHERE question_id=3 and responses.date >= date_trunc('month', current_date - interval '1 month') and responses.date < date_trunc('month', current_date) and client_response='No' `,
    }

    return db
      .query(query)
      .then(result => {
       return result.rows[0]
      //  console.log(result.rows[0])
      })
      .catch((err) => err);
  }


  const getQ4Yes = id => {
    const query = {
      text: `select count(*) from responses WHERE question_id=4 and responses.date >= date_trunc('month', current_date - interval '1 month') and responses.date < date_trunc('month', current_date) and client_response='Yes' `,
    }

    return db
      .query(query)
      .then(result => {
       return result.rows[0]
      //  console.log(result.rows[0])
      })
      .catch((err) => err);
  }


  const getQ4No = id => {
    const query = {
      text: `select count(*) from responses WHERE question_id=4 and responses.date >= date_trunc('month', current_date - interval '1 month') and responses.date < date_trunc('month', current_date) and client_response='No' `,
    }

    return db
      .query(query)
      .then(result => {
       return result.rows[0]
      //  console.log(result.rows[0])
      })
      .catch((err) => err);
  }





  return {
    getQ1Yes,
    getQ1No,
    getQ2Yes,
    getQ2No,
    getQ3Yes,
    getQ3No,
    getQ4Yes,
    getQ4No,
  };
};