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
const {getClientIdByEmail}= require('../helpers/clientDbHelpers')(db);

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
 /*
  //email message options
  const mailOptions ={
    from :'cedarhouse.lighthouselabs@gmail.com',
    to : [],
    subject :'Cedar House survey',
    //text:'Hello '
    html: ` <html
    <head>
    <style>
    .button {
    background-color: #725744;
    border: none;
    color: white;
    padding: 7px 7px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    }
    .disabled {
    opacity: 0.6;
    cursor: not-allowed;
    }
    </style>
    </head>
         <body>
           <p>
          We would like to thank you for choosing Cedar House,and we hope you enjoyed your stay,As you know your feedback is essential to help us undrstand your expectations.
         </p>
         <p>
          Thank you for taking the time to fill in the survey.
         </p>
         
         <form action="http://localhost:3002/survey/">
         <input type="submit" value="Start the Survey" />
     </form>    
         </body>
         
    </html>
    `
  };*/

  getClientsEmails().then((email) => {
   console.log(email);
    const EmailList= email.map(({ email }) => email);

      //cron.schedule('1 * *  * *',()=>{
      //cron.schedule('0 13 1/1  * *',()=>{
       
        EmailList.forEach(email => {

          getClientIdByEmail(email).then((clientId) => {
            //  const EmailList= email.map(({ email }) => email);
            addNewSentSurvey(clientId.id).then((sentSurveyId) => {
              //console.log(clientId)
              //mailOptions.to = email;
             // console.log(Object.values(clientId));
                  const mailOptions ={
                    from :'cedarhouse.lighthouselabs@gmail.com',
                    to : email,
                    subject :'Cedar House survey',
                    html:  `<a href="http://localhost:3002/survey/${sentSurveyId.id}">Start survey</a>` 
                  }
              //mailOptions.html = 'your client Id is ' + sentSurveyId.id
              gmailTransport.sendMail(mailOptions, (error,info) => {
                  if(error) {
                    console.log(error);
                    res.json(error);
                  }
                  console.log("email is send");
                  console.log(info);
                  res.json(info);
              });  

            });
            
          });
         
        });
        
      //})
  } );


  return router;

};


