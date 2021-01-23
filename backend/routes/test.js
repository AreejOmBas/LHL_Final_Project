const express = require('express');
const router = express.Router();
const cron= require('node-cron');
const nodemailer= require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const MailConfig = require('../config/email');
const gmailTransport = MailConfig.GmailTransport;

module.exports =  db => {

const {getClientsEmails}= require('../helpers/clientDbHelpers')(db);
const {addNewSentSurvey}= require('../helpers/sentSurveyDbHelpers')(db);
const {getClientIdByEmail}= require('../helpers/clientDbHelpers')(db);

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  gmailTransport.use('compile', hbs({
  viewEngine: 'express-handlebars',
  viewPath: './views/'
  }));

  getClientsEmails().then((email) => {
   console.log(email);
    const EmailList= email.map(({ email }) => email);

      //cron.schedule('1 * *  * *',()=>{
      //cron.schedule('0 13 1/1  * *',()=>{
       
        EmailList.forEach(email => {

          getClientIdByEmail(email).then((clientId) => {
            //  const EmailList= email.map(({ email }) => email);
            addNewSentSurvey(clientId.id).then((sentSurveyId) => {
              //console.log(sentSurveyId)
              //mailOptions.to = email;
             // console.log(Object.values(clientId));
                  const mailOptions ={
                    from :'cedarhouse.lighthouselabs@gmail.com',
                    to : email,
                    subject :'Cedar House survey',
                    template: 'index',
                    context: {
                      sentSurveyId: sentSurveyId.id,
                    } ,
                    
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

