
/* 
  File responsible for sending survey notifications to clients via email
*/

const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const MailConfig = require('../config/email');
const gmailTransport = MailConfig.GmailTransport;

module.exports = db => {

  const { getClientsEmails } = require('../helpers/clientDbHelpers')(db);
  const { addNewSentSurvey } = require('../helpers/sentSurveyDbHelpers')(db);
  const { getClientIdByEmail } = require('../helpers/clientDbHelpers')(db);
  const { getFirstNameById } = require('../helpers/clientDbHelpers')(db);


  gmailTransport.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: './views/'
  }));
  cron.schedule('0 13 1/1 * *', () => {
    getClientsEmails().then((email) => {

      const EmailList = email.map(({ email }) => email);
      console.log(email)


      EmailList.forEach(email => {
        getClientIdByEmail(email).then((clientId) => {
          addNewSentSurvey(clientId.id).then((sentSurveyId) => {
            getFirstNameById(clientId.id).then((name) => {

              const mailOptions = {
                from: process.env.GMAIL_USER_NAME,
                to: email,
                subject: 'Cedar House survey',
                template: 'index',
                context: {
                  sentSurveyId: sentSurveyId.id,
                  firstName: name.first_name,
                  webAddress: process.env.ORIGIN
                },

              }

              gmailTransport.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                  res.json(error);
                }
                res.json(info);
              });

            });
          });

        });

      });

    });
  })


  return router;

};