const express = require('express');
const router = express.Router();
const cron= require('node-cron');
const nodemainler= require('nodemailer');

const MailConfig = require('../config/email');
const gmailTransport = MailConfig.GmailTransport;
/*
// delete this from here
 const getClientsEmails = async (db) => {
  const query = {
    text: `SELECT email FROM clients ` ,

}

return db
    .query(query)
    .then(result =>{ 
      return  result.rows
    //console.log(result.rows)
  })
    .catch((err) => err);
}
//................................
*/
module.exports =  db => {

const {getClientsEmails}= require('../helpers/clientDbHelpers')(db);
const {addNewSentSurvey}= require('../helpers/sentSurveyDbHelpers')(db);
const {getClientsEmailsandIds}= require('../helpers/sentSurveyDbHelpers')(db);

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
 
  //email message options
  const mailOptions ={
    from :'cedarhouse.lighthouselabs@gmail.com',
    //to : [],
    subject :'Cedar House survey',
    //text:'Hello '
    html: `<html><body>We would like to chank you for choosing Cedar House,and we hope you enjoyed your stay at Cedar House
     you're sentId is ${test} 
     </body></html>`
  };

  getClientsEmails().then((email) => {

    const EmailList= email.map(({ email }) => email);
      //cron.schedule('1 * *  * *',()=>{
      //cron.schedule('0 13 1/1  * *',()=>{
        getClientsEmailsandIds
        EmailList.forEach(email => {
          


          mailOptions.to = email;
          gmailTransport.sendMail(mailOptions, (error,info) => {
            if(error) {
              console.log(error);
              res.json(error);
            }
            console.log("email is send");
            console.log(info);
            res.json(info)
          });  
        });
        
      //})
  } );


  return router;

};
